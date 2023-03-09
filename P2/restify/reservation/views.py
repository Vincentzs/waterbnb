from django.shortcuts import render
from django.contrib import admin
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from reservation.models import Reservation
from reservation.serializers import reservationSerializer
from property.models import Property
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework.generics import CreateAPIView,RetrieveUpdateAPIView

# Create your views here.
@api_view(['GET'])
def reservation_list(request):
    """List all reservations for the current user"""
    if request.method == 'GET':
        cur_user = User.objects.get(pk=2)
        # cur_user = User.objects.get(pk=request.user.id)
        reservations = Reservation.objects.filter(Q(host=cur_user) | Q(liable_guest=cur_user))
        paginator = PageNumberPagination()
        paginator.page_size = 2
        page = paginator.paginate_queryset(reservations, request)
        serializer = reservationSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def reservation_list_filter(request, criteria):
    ALLOWED_STATUSES = ('pending','expired','approved', 'denied','canceled','terminated','completed')

    try:
        current_user = User.objects.get(pk=1)
        # current_user = User.objects.get(pk=request.user.id)
        reservations = Reservation.objects.filter(Q(host=current_user) | Q(liable_guest=current_user))
    except reservations.DoesNotExist:
        return Response(data={'error': 'You dont have any reservation records'},status=status.HTTP_404_NOT_FOUND)

    if criteria == 'host':
        try:
            reservations = reservations.filter(host=current_user)
        except reservations.DoesNotExist:
            return Response(data={'error': 'You dont have records about hosting any property'},status=status.HTTP_404_NOT_FOUND)
    elif criteria == 'guest':
        try:
            reservations = reservations.filter(liable_guest=current_user)
        except reservations.DoesNotExist:
            return Response(data={'error': 'You dont have records about requesting any reservations'},status=status.HTTP_404_NOT_FOUND)
    elif criteria in ALLOWED_STATUSES:
        try:
            reservations =  reservations.filter(reservation_status=criteria)
        except reservations.DoesNotExist:
            return Response(data={'error': f'You dont have records about {criteria} reservations'},status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(data={'error': 'You are not enter a valid filter condition'},status=status.HTTP_400_BAD_REQUEST)

    paginator = PageNumberPagination()
    paginator.page_size = 2
    page = paginator.paginate_queryset(reservations, request)
    serializer = reservationSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)

class reservationCreate(CreateAPIView):
    serializer_class = reservationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            errors = serializer.errors
            reservation_status = request.data.get('reservation_status')
            cur_user = User.objects.get(pk=1)
            # cur_user = User.objects.get(request.user.id)
            error_messages = {}
            if cur_user != request.data.get('liable_guest'):
                error_messages['authentication'] = 'You should be the liable_guest in the reservation'
            if reservation_status is not None and reservation_status != 'pending':
                error_messages['reservation_status'] = 'Reservation status must be Pending when creating a new reservation'
            errors.update(error_messages)
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            reservation_status = serializer.validated_data.get('reservation_status')
            reservation = Reservation()
            reservation.check_in = serializer.validated_data.get('check_in')
            reservation.check_out = serializer.validated_data.get('check_out')
            reservation.host = serializer.validated_data.get('host')
            reservation.liable_guest = serializer.validated_data.get('liable_guest')
            reservation.number_of_guests = serializer.validated_data.get('number_of_guests')
            reservation.reservation_status = serializer.validated_data.get('reservation_status')
            # reservation.place = serializer.validated_data.get('place')
            reservation = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class reservationCancel(RetrieveUpdateAPIView):
    # try:
    current_user = User.objects.get(pk=1)
    # current_user = User.objects.get(pk=request.user.id)
    queryset = Reservation.objects.filter(Q(host=current_user) | Q(liable_guest=current_user))
    serializer_class = reservationSerializer
    # except queryset.DoesNotExist:
    #     return Response(data={'error': 'You dont have any reservation records'},status=status.HTTP_404_NOT_FOUND)

    def get_object(self):
        reservation_id = self.kwargs.get('pk')
        # self.check_object_permissions(self.request, reservation)
        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except reservation.DoesNotExist:
            return Response({'detail': 'Reservation not found'}, status=status.HTTP_404_NOT_FOUND)
        return reservation

    def get(self, request, *args, **kwargs):
        reservation = self.get_object()
        current_user = User.objects.get(id=1)
        # under pending state, if the host cancel the request, change to denied
        if reservation.host == current_user and reservation.reservation_status == 'pending':
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'denied'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif reservation.host == current_user and reservation.reservation_status == 'approved':
            # after host approve the request, host canceled the reservation
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'terminated'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif reservation.liable_guest == current_user and reservation.reservation_status == 'approved':
            # after host approve the request, host canceled the reservation
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'canceled'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'You are not authorized to cancel this reservation.'}, status=status.HTTP_403_FORBIDDEN)
