from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Property
from .serializers import CreatePropertySerializer
from django.http import Http404
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login as normal_login, authenticate
import datetime
from rest_framework.generics import RetrieveAPIView
from .models import Property
from .serializers import CreatePropertySerializer
from .serializers import PropertyImageSerializer
from .models import PropertyImage
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import PropertyImage


class PropertyListByUser(ListAPIView):
    serializer_class = CreatePropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Property.objects.filter(owner=user)



class PropertyImageUpload(CreateAPIView):
    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        property_id = self.kwargs.get('propertyId')
        property_instance = get_object_or_404(Property, id=property_id)

        if request.user != property_instance.owner:
            return Response(status=status.HTTP_403_FORBIDDEN)

        images = request.FILES.getlist('images')
        if not images:
            return Response({"detail": "No images provided."}, status=status.HTTP_400_BAD_REQUEST)

        for image in images:
            PropertyImage.objects.create(
                property=property_instance, image=image)

        return Response({"detail": "Images uploaded successfully."}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_image(request, image_id):
    try:
        image = PropertyImage.objects.get(id=image_id)

        # You can add a check here to ensure the user is authorized to delete the image.
        if request.user != image.property.owner:
            return JsonResponse({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        image.delete()
        return JsonResponse({"detail": "Image deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    except PropertyImage.DoesNotExist:
        return JsonResponse({"detail": "Image not found"}, status=status.HTTP_404_NOT_FOUND)


class PropertyRetrieve(RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = CreatePropertySerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'propertyId'

    def get_queryset(self):
        queryset = Property.objects.all().prefetch_related('images')
        return queryset


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
        serializer.save(available_dates=final)

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
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        if self.request.user != self.get_object().owner:
            raise Http404

        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        start_month = self.request.query_params.get('start_month')
        end_month = self.request.query_params.get('end_month')
        setnone = self.request.query_params.get('none')
        try:
            setprice = self.request.query_params.get('price')
        except ValueError:
            raise Http404("Invalid input for price")

        if start_date and end_date and start_month and end_month:
            start_date, end_date, start_month, end_month = validate_date_range(
                start_date, end_date, start_month, end_month)
            if setnone == "true" and setprice is not None:
                raise Http404
            if setnone == "true":
                change_available_dates_to_none(
                    start_date, end_date, start_month, end_month, self.kwargs['pk'])
            elif setprice:
                setprice = int(setprice)
                change_available_dates_to_price(
                    start_date, end_date, start_month, end_month, self.kwargs['pk'], setprice)

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
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        start_month = self.request.query_params.get('start_month')
        end_month = self.request.query_params.get('end_month')
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
            start_date, end_date, start_month, end_month = validate_date_range(
                start_date, end_date, start_month, end_month)
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


def change_available_dates_to_none(start_date, end_date, start_month, end_month, property_id):
    property = Property.objects.get(id=property_id)
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for i in range(start_month-1, end_month):
        if i == start_month-1:
            for j in range(start_date-1, month_days[i]):
                property.available_dates[i][j] = "None"
        elif i == end_month-1:
            for j in range(0, end_date):
                property.available_dates[i][j] = "None"
        else:
            for j in range(0, month_days[i]):
                property.available_dates[i][j] = "None"
    property.save()


def change_available_dates_to_price(start_date, end_date, start_month, end_month, property_id, price):
    property = Property.objects.get(id=property_id)
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for i in range(start_month-1, end_month):
        if i == start_month-1:
            for j in range(start_date-1, month_days[i]):
                property.available_dates[i][j] = price
        elif i == end_month-1:
            for j in range(0, end_date):
                property.available_dates[i][j] = price
        else:
            for j in range(0, month_days[i]):
                property.available_dates[i][j] = price
    property.save()


def change_available_dates_to_default(start_date, end_date, start_month, end_month, property_id):
    property = Property.objects.get(id=property_id)
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for i in range(start_month-1, end_month):
        if i == start_month-1:
            for j in range(start_date-1, month_days[i]):
                property.available_dates[i][j] = property.default_price
        elif i == end_month-1:
            for j in range(0, end_date):
                property.available_dates[i][j] = property.default_price
        else:
            for j in range(0, month_days[i]):
                property.available_dates[i][j] = property.default_price
    property.save()


def validate_date_range(start_date, end_date, start_month, end_month):
    try:
        start_date = int(start_date)
        end_date = int(end_date)
        start_month = int(start_month)
        end_month = int(end_month)
        datetime.datetime(2001, start_date, start_month)
        datetime.datetime(2001, end_date, end_month)
    except ValueError:
        raise Http404("Invalid input for date or month")

    # If all checks pass, return the valid dates as integers
    return start_date, end_date, start_month, end_month
