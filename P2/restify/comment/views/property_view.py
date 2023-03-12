from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from property.models import Property
from comment.models.property_model import Comment
from reservation.models import Reservation
from user.models import RestifyUser
from ..serializers.property_serializers import CommentSerializer, CommentDetailSerializer
from rest_framework import generics, serializers
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination


class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        # need to add to check if user reserved at the current property
        property = get_object_or_404(Property, pk=kwargs['property_id'])
        # CHECK ONE COMMENT FOR ONE GUEST
        # if Comment.objects.filter(property=property, commenter=self.request.user).exists():
        #     raise serializers.ValidationError(
        #         {'detail': 'You have already commented on this property.'})

        # CHECK GUEST RESERVED
        # if Reservation.objects.filter(place=property, liable_guest=self.request.user, _reservation_status="completed").exists() or \
        #     Reservation.objects.filter(place=property, liable_guest=self.request.user, _reservation_status="terminated").exists():

        parent_id = request.data.get('parent')
        rating_value = None
        if parent_id:
            try:
                parent = Comment.objects.get(pk=parent_id)
            except ObjectDoesNotExist:
                return Response(
                    {'detail': 'Invalid parent comment id.'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            parent = None
            rating = request.data.get('rating', None)
            if rating and rating is not None:
                rating_value = int(rating)
                if rating_value < 1 or rating_value > 5:
                    return Response(
                        {'detail': 'Rating should be between 1 and 5.'},
                        status=status.HTTP_400_BAD_REQUEST
                )

        comment = Comment.objects.create(
            commenter=self.request.user,
            property=property,
            text=request.data['text'],
            parent=parent,
            rating=rating_value,
        )

        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # raise serializers.ValidationError({'detail': 'You have not completed/terminated a reservation at this property.'})


class AllCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_queryset(self):
        requested_property = Property.objects.filter(
            id=self.kwargs['property_id']).first()
        comments = Comment.objects.filter(
            property=requested_property).filter(parent=None)
        return comments

class DetailCommentView(generics.RetrieveAPIView):
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
