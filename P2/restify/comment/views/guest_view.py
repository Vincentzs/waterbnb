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


class AddHostToGuestCommentView(CreateAPIView):
    # need to add permission for host only, need property
    permission_classes = [IsAuthenticated]
    serializer_class = HostToGuestCommentSerializer

    def create(self, request, *args, **kwargs):
        property = get_object_or_404(Property, pk=kwargs['property_id'])
        guest = get_object_or_404(RestifyUser, pk=kwargs['guest_id'])
        rating_value = None
        if HostToGuestComment.objects.filter(property=property, host_commenter=self.request.user).exists():
            raise serializers.ValidationError(
                {'detail': 'You have already commented on this property.'})
        # if Reservation.objects.filter(place=property, liable_guest=guest, _reservation_status="completed").exists():
        rating = request.data.get('rating', None)
        if rating and rating is not None:
            rating_value = int(rating)
            if rating_value < 1 or rating_value > 5:
                return Response(
                    {'detail': 'Rating should be between 1 and 5.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        comment = HostToGuestComment.objects.create(
            host_commenter=self.request.user,
            guest=guest,
            property=property,
            text=request.data['text'],
            rating=rating_value,
        )
        serializer = HostToGuestCommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class HostToGuestAllCommentView(generics.ListAPIView):
    serializer_class = HostToGuestCommentSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10
    # need to add permission for host only, need property
    def get_queryset(self):
        requested_property = Property.objects.filter(id=self.kwargs['property_id']).first()
        # requested_guest = HostToGuestComment.objects.filter(id=self.kwargs['guest_id']).first()
        comments = HostToGuestComment.objects.filter(property=requested_property)
        return comments