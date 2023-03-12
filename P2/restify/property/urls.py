from django.urls import path
from . import views

app_name="property"

urlpatterns = [
    path('create/', views.PropertyCreate.as_view(), name='create'),
    path('delete/<int:pk>/', views.PropertyDelete.as_view(), name='delete'),
    path('update/<int:pk>/', views.PropertyUpdate.as_view(), name='update'),
    path('search/', views.PropertySearch.as_view(), name='property-search'),
    path('login/', views.login, name='login'),
    # path('<int:user_id>/filter/<int:pk>', views.PropertyFilter.as_view(), name='filter'),
    # path('<int:user_id>/order/<int:pk>', views.PropertyOrder.as_view(), name='order'),
]
