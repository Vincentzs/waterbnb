from django.urls import path
from . import views

app_name = "property"

urlpatterns = [
    path('create/', views.PropertyCreate.as_view(), name='create'),
    path('delete/<int:pk>/', views.PropertyDelete.as_view(), name='delete'),
    path('update/<int:pk>/', views.PropertyUpdate.as_view(), name='update'),
    path('search/', views.PropertySearch.as_view(), name='property-search'),
    path('property_detail/<int:propertyId>/',
         views.PropertyRetrieve.as_view(), name='property-detail'),
    path('property_image_upload/<int:propertyId>/',
         views.PropertyImageUpload.as_view(), name='property-image-upload'),
]
