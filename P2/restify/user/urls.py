from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import UserViews



app_name="user"

urlpatterns = [
    path('register/', UserViews.RegisterView.as_view(), name='register'),
    path('profile/', UserViews.ProfileView.as_view(), name='profile'),
    # path('profile/edit/', UserViews.EditProfileView.as_view(), name='edit_profile'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
