from django.shortcuts import render
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .forms import LoginForm
from django.contrib.auth.decorators import login_required
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer

class LoginView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            auth_login(request, form.cleaned_data['user'])
            return Response({'success': True})
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request):
        return Response({'message': 'This endpoint supports only POST requests.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

class LogoutView(APIView):
    permission_classes = (AllowAny)
    def post(self, request):
        if authenticate != None:
            auth_logout(request)
        return Response({'success': True})

    def get(self, request):
        return Response({'message': 'This endpoint supports only POST requests.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class UpdateProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response({'message': 'Method not allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    
