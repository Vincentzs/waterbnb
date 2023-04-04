from django.urls import path
from . import views

app_name="notification"

urlpatterns = [
    path('all/', views.notification_list),
    path('<int:pk>/detail/',views.notificationDetail,name='detail'),
]
