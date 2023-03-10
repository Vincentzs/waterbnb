from django.shortcuts import render
from django.contrib import admin
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework import status
from user.models import RestifyUser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from notification.models import Notification
from notification.serializers import notificationSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notification_list(request):
    """List all notifications messages, or create a new notification message"""
    if request.method == 'GET':
        paginator = PageNumberPagination()
        paginator.page_size = 2 # set the number of notifications per page
        notifications = Notification.objects.filter(user=request.user)
        page = paginator.paginate_queryset(notifications, request)
        serializer = notificationSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notificationDetail(request, pk):
    try:
        # also need to check if the notification belongs to the authencated user
        notification = Notification.objects.get(pk=pk)            
    except notification.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        if request.user == notification.user:
            notification.read = True
            notification.save()
            serializer = notificationSerializer(notification)
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(status=403)
    elif request.method == 'DELETE':
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

