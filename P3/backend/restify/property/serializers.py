from rest_framework.serializers import ModelSerializer
from .models import Property
from rest_framework import serializers
from rest_framework import fields
from .models import Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ('image', 'property')


class CreatePropertySerializer(ModelSerializer):
    amenity = fields.MultipleChoiceField(choices=Property.AMENITY_CHOICES)
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = ('id', 'property_name', 'description', 'location',
                  'guest_capacity', 'amenity', 'default_price', 'images')
        read_only_fields = ['id']
