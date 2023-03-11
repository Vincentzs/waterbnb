from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from property.models import Property
from comment.models import Comment
from reservation.models import Reservation
from user.models import RestifyUser
from ..serializers import CommentSerializer
from rest_framework import generics, serializers
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination


class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        # need to add to check if user reserved at the current property
        property = get_object_or_404(Property, pk=kwargs['property_id'])
        # if Comment.objects.filter(property=property, commenter=self.request.user).exists():
        #     raise serializers.ValidationError(
        #         {'detail': 'You have already commented on this property.'})
        # if Reservation.objects.filter(place=property, liable_guest=self.request.user, _reservation_status="completed").exists() or \
        #     Reservation.objects.filter(place=property, liable_guest=self.request.user, _reservation_status="terminated").exists():
        comment = Comment.objects.create(
            commenter=self.request.user,
            property=property,
            text=request.data['text'])
        return Response(
            {"user": comment.commenter.id, "property": comment.property.id, "added_date": comment.added_date, "text": comment.text}, status=status.HTTP_201_CREATED
        )
        # raise serializers.ValidationError({'detail': 'You have not completed/terminated a reservation at this property.'})


class AllCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10
    def get_queryset(self):
        requested_property = Property.objects.filter(
            id=self.kwargs['property_id']).first()
        comments = Comment.objects.filter(property=requested_property)
        return comments
