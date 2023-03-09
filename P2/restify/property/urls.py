from django.urls import path
from . import views

app_name="property"

urlpatterns = [
    path('create/', views.PropertyCreate.as_view(), name='create'),
    path('delete/<int:pk>', views.PropertyDelete.as_view(), name='delete'),
    path('update/<int:pk>/', views.PropertyGetSet.as_view(), name='update'),
    path('all/', views.PropertyGetSet.as_view(), name='all'),

]
