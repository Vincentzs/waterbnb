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
from notification.models import Notification
from notification.serializers import notificationSerializer
import math

class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        # need to add to check if user reserved at the current property
        try:
            property = get_object_or_404(Property, pk=kwargs['property_id'])

            parent_serializer = request.data["parent"]
            rating_serializer = request.data["rating"]
            text_serializer = request.data["text"]
            # Validate Text
            if not text_serializer:
                raise serializers.ValidationError(
                    {'detail': 'Text invalid/empty'},
                )
            # Validate Rating & Parent
            if not parent_serializer:  # this is comment
                # CHECK ONE COMMENT FOR ONE GUEST
                if Comment.objects.filter(property=property, commenter=self.request.user).exists():
                    raise serializers.ValidationError(
                        {'detail': 'You have already commented on this property.'})
                # CHECK GUEST RESERVED
                if not (Reservation.objects.filter(place=property, liable_guest=self.request.user, _reservation_status="completed").exists() and
                        Reservation.objects.filter(place=property, liable_guest=self.request.user, _reservation_status="terminated").exists()):
                    raise serializers.ValidationError(
                        {'detail': 'You have not completed/terminated a reservation at this property.'})
                parent = None
                if not rating_serializer:
                    raise serializers.ValidationError(
                        {'detail': 'Rating invalid/empty'},
                    )
                else:
                    if validate_rating(request.data.get('rating')):
                        rating = int(request.data.get('rating'))
                    else:
                        raise serializers.ValidationError(
                            {'detail': 'Rating should be between 0 and 5'},
                        )
            else:  # this is reply
                parent_id = request.data.get('parent')
                try:
                    parent = get_object_or_404(Comment, pk=parent_id)
                    if Comment.objects.filter(property=property, commenter=self.request.user).exists():
                        raise serializers.ValidationError(
                            {'detail': 'You have already replied on this comment.'})
                    if parent.commenter == self.request.user:
                        raise serializers.ValidationError(
                            {'detail': 'You cannot reply to yourself'})
                except ObjectDoesNotExist:
                    raise serializers.ValidationError(
                        {'detail': 'Invalid parent comment id.'},
                    )
                if rating_serializer:
                    raise serializers.ValidationError(
                        {'detail': 'Cannot have Rating for a reply'},
                    )
                else:
                    rating = None

            comment = Comment.objects.create(
                commenter=self.request.user,
                property=property,
                text=request.data['text'],
                parent=parent,
                rating=rating,
            )
            check_notification_user(parent, property)
            update_rating(property)
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValueError as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
def validate_rating(rating):
    if int(rating) < 0 or int(rating) > 5:
        return False
    return True

def update_rating(property):
    try:
        comments = Comment.objects.filter(property=property)
        count = comments.count()
        sum = 0
        for comment in comments:
            if comment.rating == None:
                continue
            sum += comment.rating
        property.rating = math.floor(sum/count)
        property.save()
    except ValueError as e:
        return Response(status=status.HTTP_404_NOT_FOUND)

def check_notification_user(parent, property):
    create_not = Notification()
    if not parent:
        notify_user = property.owner
        create_not.title = "Property Comment"
        create_not.text = "You recieved a comment"
    else:
        notify_user = parent.commenter
        create_not.title = "Property Reply"
        create_not.text = "You recieved a reply"
    create_not.notification_type = "approval"
    create_not.user = notify_user
    create_not.save()
    not_serializer = notificationSerializer(create_not)


class AllCommentView(generics.ListAPIView):
    serializer_class = CommentSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        requested_property = Property.objects.filter(
            id=self.kwargs['property_id']).first()
        comments = Comment.objects.filter(
            property=requested_property).filter(parent=None)
        return comments


class DetailCommentView(generics.RetrieveAPIView):
    serializer_class = CommentDetailSerializer
    queryset = Comment.objects.all()
