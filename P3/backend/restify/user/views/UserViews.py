from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from ..serializers import CreateUserSerializer, GetUserSerializer, EditUserSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, GenericAPIView
from rest_framework.views import APIView
from django.contrib.auth import login, logout


class RegisterView(CreateAPIView):
    serializer_class = CreateUserSerializer


class ProfileView(RetrieveAPIView):
    serializer_class = GetUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class EditProfileView(RetrieveAPIView, UpdateAPIView):
    serializer_class = EditUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class LogoutView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        logout(request)
        return Response('Successfully logout',  status=status.HTTP_202_ACCEPTED)