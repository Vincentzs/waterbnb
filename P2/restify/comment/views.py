from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from property.models import Property
from comment.models import Comment
from user.models import RestifyUser
from .serializers import CommentSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination

class AddCommentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        property = get_object_or_404(Property, pk=kwargs['property_id'])
        comment = Comment.objects.create(
            commenter=self.request.user,
            property=property,
            text=request.data['text'])
        return Response(
            {"user": comment.commenter.id, "property": comment.property.id, "text": comment.text}, status=status.HTTP_201_CREATED
        )


class CommentView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        requested_property = Property.objects.filter(
            id=self.kwargs['property_id']).first()
        # paginator = PageNumberPagination()
        # paginator.page_size = 2
        comments = Comment.objects.filter(property=requested_property)
        # page = paginator.paginate_queryset(comments, self.request)
        # serializer = self.serializer_class(page, many=True)
        # return paginator.get_paginated_response(serializer.data)
        return comments