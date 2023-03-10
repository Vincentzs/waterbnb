from django.shortcuts import render
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..serializers import CreateUserSerializer, GetUserSerializer
from ..models import RestifyUser
from django.contrib.auth.decorators import login_required
from rest_framework.generics import CreateAPIView,RetrieveAPIView, UpdateAPIView

class RegisterView(CreateAPIView):
    serializer_class = CreateUserSerializer

class ProfileView(RetrieveAPIView):
    serializer_class = GetUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

