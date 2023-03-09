from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Property
from .serializers import PropertySerializer
from user.models import RestifyUser


# @api_view(['GET'])
# def PropertyAll(request):
#     properties = Property.objects.all()
#     return Response([{
#         'name': property.name,
#         'description': property.description,
#         'owner': property.owner,
#         'location': property.location,
#         'available_dates': property.available_dates,
#         'guest_capacity': property.guest_capacity,
#         'amenities': property.amenities,
#         'rating': property.rating,
#         'price': property.price,
#     } for property in properties])


class PropertyCreate(CreateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer


class PropertyDelete(DestroyAPIView):
    # permission_classes = [IsAuthenticated]

    # def get_object(self):
    #     property_id = self.kwargs.get('property_id')
    #     queryset = self.get_queryset()
    #     obj = queryset.filter(id=property_id, owner=self.request.user).first()
    #     return obj

    queryset = Property.objects.all()
    serializer_class = PropertySerializer


class PropertyGetSet(RetrieveAPIView, UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = PropertySerializer

    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])
