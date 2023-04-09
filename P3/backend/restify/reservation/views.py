from django.shortcuts import render
from django.contrib import admin
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from django.core.paginator import Paginator
from rest_framework import status
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from reservation.models import Reservation
from reservation.serializers import reservationSerializer
from property.models import Property
from property.serializers import CreatePropertySerializer
from user.models import RestifyUser
from user.serializers import GetUserSerializer
from django.db.models import Q
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from notification.models import Notification
from notification.serializers import notificationSerializer
import copy


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


def check_available_dates(start_date, end_date, start_month, end_month, property_id):
    property = Property.objects.get(id=property_id)
    month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    for i in range(start_month-1, end_month):
        if i == start_month-1:
            for j in range(start_date-1, month_days[i]):
                if property.available_dates[i][j] == "None":
                    return False
        elif i == end_month-1:
            for j in range(0, end_date):
                if property.available_dates[i][j] == "None":
                    return False
        else:
            for j in range(0, month_days[i]):
                if property.available_dates[i][j] == "None":
                    return False
    return True

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reservation_list(request):
    """List all reservations for the current user"""
    if request.method == 'GET':
        cur_user = RestifyUser.objects.get(pk=request.user.id)
        reservations = Reservation.objects.filter(
            Q(host=cur_user) | Q(liable_guest=cur_user))
        paginator = PageNumberPagination()
        paginator.page_size = 2
        page = paginator.paginate_queryset(reservations, request)
        serializer = reservationSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def reservation_list_filter(request, criteria):
    ALLOWED_STATUSES = ('pending', 'expired', 'approved',
                        'denied', 'canceled', 'terminated', 'completed')
    current_user = RestifyUser.objects.get(pk=request.user.id)
    reservations = Reservation.objects.filter(
        Q(host=current_user) | Q(liable_guest=current_user))
    if not reservations:
        return Response(data={'error': 'No reservation records'}, status=status.HTTP_204_NO_CONTENT)

    if criteria == 'host':
        reservations = reservations.filter(host=current_user)
        if not reservations:
            return Response(data={'error': 'No records about hosting any property'}, status=status.HTTP_204_NO_CONTENT)
    elif criteria == 'guest':
        reservations = reservations.filter(liable_guest=current_user)
        if not reservations:
            return Response(data={'error': 'No records about requesting any reservations'}, status=status.HTTP_204_NO_CONTENT)
    elif criteria in ALLOWED_STATUSES:
        reservations = reservations.filter(_reservation_status=criteria)
        if not reservations:
            return Response(data={'error': f'No records about {criteria} reservations'}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(data={'error': 'You entered an invalid filter condition'}, status=status.HTTP_400_BAD_REQUEST)

    paginator = PageNumberPagination()
    paginator.page_size = 2
    page = paginator.paginate_queryset(reservations, request)
    serializer = reservationSerializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hostList(request):
    """list all user object"""
    if request.method == 'GET':
        users = RestifyUser.objects.exclude(pk=request.user.id)
        # users = RestifyUser.objects.exclude(pk=request.user.id)
        paginator = PageNumberPagination()
        paginator.page_size = 100
        page = paginator.paginate_queryset(users, request)
        serializer = GetUserSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def guest(request):
    """list user object"""
    guest = RestifyUser.objects.get(pk=request.user.id)
    guests = [guest]
    paginator = Paginator(guests, 100)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    serializer = GetUserSerializer(page_obj, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def propertyList(request):
    """list all property object"""
    if request.method == 'GET':
        properties = Property.objects.all()
        paginator = PageNumberPagination()
        paginator.page_size = 100
        page = paginator.paginate_queryset(properties, request)
        serializer = CreatePropertySerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)


class reservationCreate(CreateAPIView):
    serializer_class = reservationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        ser_data = copy.deepcopy(request.data)
        ser_data['reservation_status'] = 'pending'
        ser_data['liable_guest'] = request.user.id
        serializer = self.get_serializer(data=ser_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # before we make reservation,check available dates
            create_pro = serializer.validated_data.get('place')
            reservation_start = serializer.validated_data.get('check_in')
            reservation_end = serializer.validated_data.get('check_out')
            available = check_available_dates(
                reservation_start.day, reservation_end.day, reservation_start.month, reservation_end.month, create_pro.id)
            if (available):
                reservation_status = serializer.validated_data.get(
                    'reservation_status')
                reservation = Reservation()
                reservation.check_in = serializer.validated_data.get(
                    'check_in')
                reservation.check_out = serializer.validated_data.get(
                    'check_out')
                reservation.host = serializer.validated_data.get('host')
                reservation.liable_guest = serializer.validated_data.get(
                    'liable_guest')
                reservation.number_of_guests = serializer.validated_data.get(
                    'number_of_guests')
                reservation.reservation_status = serializer.validated_data.get(
                    'reservation_status')
                reservation.place = serializer.validated_data.get('place')
                reservation = serializer.save()
                # when user create a reservation, we should send a notification to host
                create_not = Notification()
                create_not.title = "New Reservation Request"
                create_not.text = f"You have received a new reservation request for {reservation.number_of_guests} guests from {reservation.liable_guest.username}."
                create_not.notification_type = "reservation"
                create_not.user = reservation.host
                create_not.save()
                not_serializer = notificationSerializer(create_not)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'detail': 'Bad Time'}, status=status.HTTP_400_BAD_REQUEST)


class reservationCancel(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    # current_user = RestifyUser.objects.get(pk=self.request.user.id)
    queryset = Reservation.objects.all()
    serializer_class = reservationSerializer

    def get_object(self):
        reservation_id = self.kwargs.get('pk')
        # self.check_object_permissions(self.request, reservation)
        reservation = Reservation.objects.get(id=reservation_id)
        if not reservation:
            return Response({'detail': 'Reservation not found'}, status=status.HTTP_404_NOT_FOUND)
        return reservation

    def get(self, request, *args, **kwargs):
        reservation = self.get_object()
        reservations = [reservation]
        paginator = Paginator(reservations, 100)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        serializer = reservationSerializer(page_obj, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        reservation = self.get_object()
        current_user = RestifyUser.objects.get(pk=request.user.id)
        # under pending state, if the host cancel the request, change to denied
        if reservation.host == current_user and reservation.reservation_status == 'pending':
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(
                instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'denied'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                # when host denied the request, we should send a notification to user about denied
                create_not = Notification()
                create_not.title = "Host Denied Request"
                create_not.text = f"Your request for {reservation.host.username}'s property is denied."
                create_not.notification_type = "cancellation"
                create_not.user = reservation.liable_guest
                create_not.save()
                not_serializer = notificationSerializer(create_not)
                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif reservation.host == current_user and reservation.reservation_status == 'approved':
            # after host approve the request, host canceled the reservation
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(
                instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'terminated'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                # when host canceled the reservation after approving it
                create_not = Notification()
                create_not.title = "Host Terminated Request"
                create_not.text = f"Your request for {reservation.host.username}'s property is terminated."
                create_not.notification_type = "cancellation"
                create_not.user = reservation.liable_guest
                create_not.save()
                not_serializer = notificationSerializer(create_not)

                # # once the reservation is terminated, update the property available dates
                create_pro = reservation.place
                reservation_start = serializer.validated_data.get('check_in')
                reservation_end = serializer.validated_data.get('check_out')
                change_available_dates_to_default(
                    reservation_start.day, reservation_end.day, reservation_start.month, reservation_end.month, create_pro.id)

                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif reservation.liable_guest == current_user and reservation.reservation_status == 'approved':
            # after host approve the request, user canceled the reservation
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(
                instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'canceled'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                # when user canceled the reservation after host's approval
                create_not = Notification()
                create_not.title = "Guest Canceled Request"
                create_not.text = f"The reservation request from {reservation.liable_guest.username} is canceled."
                create_not.notification_type = "cancellation"
                create_not.user = reservation.host
                create_not.save()
                not_serializer = notificationSerializer(create_not)

                # once the reservation is canceled, update the property available dates
                create_pro = reservation.place
                reservation_start = serializer.validated_data.get('check_in')
                reservation_end = serializer.validated_data.get('check_out')
                change_available_dates_to_default(
                    reservation_start.day, reservation_end.day, reservation_start.month, reservation_end.month, create_pro.id)

                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'You are not authorized to cancel this reservation.'}, status=status.HTTP_403_FORBIDDEN)


class reservationApprove(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = reservationSerializer

    def get_object(self):
        reservation_id = self.kwargs.get('pk')
        # self.check_object_permissions(self.request, reservation)
        reservation = Reservation.objects.get(id=reservation_id)
        if not reservation:
            return Response({'detail': 'Reservation not found'}, status=status.HTTP_404_NOT_FOUND)
        return reservation

    def get(self, request, *args, **kwargs):
        reservation = self.get_object()
        reservations = [reservation]
        paginator = Paginator(reservations, 100)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        serializer = reservationSerializer(page_obj, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        reservation = self.get_object()
        # current_user = RestifyUser.objects.get(pk=1)
        current_user = RestifyUser.objects.get(pk=request.user.id)
        # under pending state, if the host approve the request, change to approved status
        if reservation.host == current_user and reservation.reservation_status == 'pending':
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(
                instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'approved'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                # when host approve the request,send to guest
                create_not = Notification()
                create_not.title = "Host Approved Request"
                create_not.text = f"Your request for {reservation.host.username}'s property is approved."
                create_not.notification_type = "approval"
                create_not.user = reservation.liable_guest
                create_not.save()
                not_serializer = notificationSerializer(create_not)

                # # once the reservation is approved by the user, we need to update the property available dates
                create_pro = reservation.place
                reservation_start = serializer.validated_data.get('check_in')
                reservation_end = serializer.validated_data.get('check_out')
                change_available_dates_to_none(
                    reservation_start.day, reservation_end.day, reservation_start.month, reservation_end.month, create_pro.id)

                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'You are not authorized to approve this reservation.'}, status=status.HTTP_403_FORBIDDEN)


class reservationComplete(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = reservationSerializer

    def get_object(self):
        reservation_id = self.kwargs.get('pk')
        # self.check_object_permissions(self.request, reservation)
        reservation = Reservation.objects.get(id=reservation_id)
        if not reservation:
            return Response({'detail': 'Reservation not found'}, status=status.HTTP_404_NOT_FOUND)
        return reservation

    def get(self, request, *args, **kwargs):
        reservation = self.get_object()
        reservations = [reservation]
        paginator = Paginator(reservations, 100)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        serializer = reservationSerializer(page_obj, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        reservation = self.get_object()
        # current_user = RestifyUser.objects.get(pk=1)
        current_user = RestifyUser.objects.get(pk=request.user.id)
        if (reservation.host == current_user or reservation.liable_guest == current_user) and reservation.reservation_status == 'approved' and reservation.check_out < timezone.now().date():
            serializer = self.get_serializer(instance=reservation)
            serializer_data = serializer.data
            serializer_data.update(request.data)
            serializer = self.get_serializer(
                instance=reservation, data=serializer_data, partial=True)
            if serializer.is_valid():
                reservation.reservation_status = 'completed'
                reservation.save()
                updated_serializer = self.get_serializer(reservation)
                return Response(updated_serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'You are not authorized to complete this reservation.'}, status=status.HTTP_403_FORBIDDEN)
