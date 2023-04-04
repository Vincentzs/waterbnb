from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from property.models import Property
from comment.models.guest_model import HostToGuestComment
from reservation.models import Reservation
from user.models import RestifyUser
from ..serializers.guest_serializers import HostToGuestCommentSerializer
from rest_framework import generics, serializers
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from notification.models import Notification
from notification.serializers import notificationSerializer


class AddHostToGuestCommentView(CreateAPIView):
    # need to add permission for host only, need property
    permission_classes = [IsAuthenticated]
    serializer_class = HostToGuestCommentSerializer

    def create(self, request, *args, **kwargs):
        try:
            property = get_object_or_404(Property, pk=kwargs['property_id'])
            guest = get_object_or_404(RestifyUser, pk=kwargs['guest_id'])
            # Non-host can't comment on Guest
            if not Property.objects.filter(id=property.id, owner=self.request.user).exists():
                raise serializers.ValidationError(
                    {'detail': 'You are not not the host of this property. Cannot add a comment to this guest.'})
            reservations = Reservation.objects.filter(place=property, liable_guest=guest, _reservation_status="completed")
            host_to_guest_coments = HostToGuestComment.objects.filter(property=property, host_commenter=self.request.user)
            # Host can't comment on Guest more thatn once/reservation at this property
            if host_to_guest_coments.exists() and reservations.count() == host_to_guest_coments.count():
                raise serializers.ValidationError(
                    {'detail': 'You have already commented on this guest for this reservation.'})
            # Host can't comment on non-reserved Guest
            if not reservations.exists():
                raise serializers.ValidationError(
                    {'detail': 'The guest has not completed a reservation at your property. Cannot add comment to this guest.'})
            
            # Error handling for null values
            serializer = self.get_serializer(data=request.data).is_valid()
            if not serializer:
                raise serializers.ValidationError(
                    {'detail': 'Rating or Text invalid/empty.'},
                )
            comment = HostToGuestComment.objects.create(
                host_commenter=self.request.user,
                guest=guest,
                property=property,
                text=request.data['text'],
                rating=int(request.data.get('rating')),
            )

            serializer = HostToGuestCommentSerializer(comment)

            # Create Notification for Guest
            create_not = Notification()
            create_not.title = "Host {host_commenter}-Guest {guest}"
            create_not.text = "Host made a comment about you"
            create_not.notification_type = "approval"
            create_not.user = guest
            create_not.save()
            not_serializer = notificationSerializer(create_not)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response(status=status.HTTP_404_NOT_FOUND)

class HostToGuestAllCommentView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HostToGuestCommentSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 2

    def get_queryset(self):
        # Only Hosts with properties can view comments of Guests.
        if not Property.objects.filter(owner=self.request.user).exists():
            raise serializers.ValidationError(
                {'detail': 'You are not a host.Cannot view the host comments for guests.'})
        requested_property = Property.objects.filter(
            id=self.kwargs['property_id']).first()
        # requested_guest = HostToGuestComment.objects.filter(id=self.kwargs['guest_id']).first()
        comments = HostToGuestComment.objects.filter(
            property=requested_property)
        return comments
