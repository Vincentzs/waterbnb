from django.urls import path
from . import views

app_name="reservation"

urlpatterns = [
    path('all/', views.reservation_list),
    path('all/<str:criteria>/', views.reservation_list_filter),
    path('create/', views.reservationCreate.as_view()),
    path('<int:pk>/cancel/', views.reservationCancel.as_view()),
]