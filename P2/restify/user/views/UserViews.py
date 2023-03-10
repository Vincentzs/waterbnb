from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from ..serializers import CreateUserSerializer, GetUserSerializer, EditUserSerializer
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
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


# class LogoutView(APIView):
#     permission_classes = (IsAuthenticated,)

#     def post(self, request):
#         try:
#             refresh_token = request.data.get("refresh_token")
#             token = RefreshToken(refresh_token)
#             token.blacklist()

#             return Response(status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

# class LogoutView(GenericAPIView):
#     serializer_class = LogOutSerializer
#     permission_classes = [IsAuthenticated]
#     def post(self, request):
#         try:
#             serializer = self.serializer_class(date=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

# class LogoutView(GenericAPIView):
#     serializer_class = LogOutSerializer
#     permission_classes = (IsAuthenticated, )

#     def post(self, request, *args):
#         sz = self.get_serializer(data=request.data)
#         sz.is_valid(raise_exception=True)
#         sz.save()
#         return Response(status=status.HTTP_204_NO_CONTENT)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        logout(request)
        return Response('Successfully logout',  status=status.HTTP_202_ACCEPTED)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
