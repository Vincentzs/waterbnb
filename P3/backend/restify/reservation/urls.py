from django.urls import path
from . import views

app_name="reservation"

urlpatterns = [
    path('all/', views.reservation_list),
    path('all/<str:criteria>/', views.reservation_list_filter),
    path('hostlist/', views.hostList),
    path('guest/', views.guest),
    path('propertylist/', views.propertyList),
    path('create/', views.reservationCreate.as_view()),
    path('<int:pk>/cancel/', views.reservationCancel.as_view()),
    path('<int:pk>/approved/', views.reservationApprove.as_view()),
    path('<int:pk>/completed/', views.reservationComplete.as_view()),
]