from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Property
from .serializers import CreatePropertySerializer
from user.models import RestifyUser
from django.http import Http404
from rest_framework import generics
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login as normal_login, authenticate
from django.http import HttpResponse


def login(request):
    if request.method == 'POST':
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        login(request, user)
        return HttpResponse(status=200)


class PropertyCreate(CreateAPIView):
    serializer_class = CreatePropertySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        final = []
        for i in range(0, 12):
            month = []
            for j in range(0, month_days[i]):
                month.append(serializer.validated_data['default_price'])
            final.append(month)
        serializer.save(owner=self.request.user, available_dates=final)
        
        
        return super().perform_create(serializer)


class PropertyDelete(DestroyAPIView):
    serializer_class = CreatePropertySerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        p_id = self.kwargs['pk']
        property = get_object_or_404(Property, id=p_id)
        if self.request.user != property.owner:
            raise Http404
        return super().delete(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Property.objects.filter(owner=self.request.user)
        return queryset


class PropertyUpdate(UpdateAPIView):
    serializer_class = CreatePropertySerializer

    def update(self, request, *args, **kwargs):
        if self.request.user != self.get_object().owner:
            raise Http404
        return super().update(request, *args, **kwargs)

    def get_queryset(self):
        # Retrieve the property instance to update
        queryset = Property.objects.filter(owner=self.request.user)
        return queryset

    def get_object(self, queryset=None):
        obj = get_object_or_404(Property, id=self.kwargs['pk'])
        return obj


class PropertySearch(ListAPIView):
    serializer_class = CreatePropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()
        month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        # Get query params for filtering and ordering
        location = self.request.query_params.get('location')
        rating = self.request.query_params.get('rating')
        guest_capacity = self.request.query_params.get('guest_capacity')
        amenities = self.request.query_params.getlist('amenity')
        order_by = self.request.query_params.get('order_by')
        start_date = int(self.request.query_params.get('start_date'))
        end_date = int(self.request.query_params.get('end_date'))
        start_month = int(self.request.query_params.get('start_month'))
        end_month = int(self.request.query_params.get('end_month'))
        # Apply filters
        if location:
            queryset = queryset.filter(location=location)
        if rating:
            queryset = queryset.filter(rating__gte=rating)
        if guest_capacity:
            queryset = queryset.filter(guest_capacity__gte=guest_capacity)
        if amenities:
            for amenity in amenities:
                queryset = queryset.filter(amenity__contains=amenity)
        if start_date and end_date and start_month and end_month:
            if start_month > end_month:
                raise Http404
            else:
                if start_month == end_month and start_date > end_date:
                    raise Http404
                else:
                    property_list = list(queryset)

                    for z in range(0, len(property_list)):
                        for i in range(start_month-1, end_month):
                            if i == start_month-1:
                                for j in range(start_date-1, month[i]):
                                    if property_list[z].available_dates[i][j] == "None":
                                        queryset = queryset.exclude(
                                            id=property_list[z].id)
                            elif i == end_month-1:
                                for j in range(0, end_date):
                                    if property_list[z].available_dates[i][j] == "None":
                                        queryset = queryset.exclude(
                                            id=property_list[z].id)
                            else:
                                for j in range(0, month[i]):
                                    if property_list[z].available_dates[i][j] == "None":
                                        queryset = queryset.exclude(
                                            id=property_list[z].id)
        # Apply ordering
        if order_by == 'price':
            queryset = queryset.order_by('default_price')
        elif order_by == 'rating':
            queryset = queryset.order_by('-rating')

        return queryset

    def list(self, request, *args, **kwargs):
        # Get queryset with filters and ordering applied
        queryset = self.get_queryset()
        paginator = PageNumberPagination()
        paginator.page_size = 2  # set the number of notifications per page
        page = paginator.paginate_queryset(queryset, request)
        serializer = CreatePropertySerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


    