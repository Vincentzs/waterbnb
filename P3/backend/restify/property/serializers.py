from rest_framework.serializers import ModelSerializer, CharField
from .models import Property
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from user.models import RestifyUser
from rest_framework import fields
class CreatePropertySerializer(ModelSerializer):
    amenity = fields.MultipleChoiceField(choices=Property.AMENITY_CHOICES)
    
    class Meta:
        model = Property
        fields = ['id','property_name', 'description', 'location', 'guest_capacity', 'amenity', 'default_price', "property_images"]
        # read_only_fields = ['id']
        
    # def create(self, validated_data):
        
    #     try:
    #         property = Property.objects.create(
    #             property_name=validated_data['property_name'],
    #             description=validated_data['description'],
    #             location=validated_data['location'],
    #             guest_capacity=validated_data['guest_capacity'],
    #             amenity=validated_data['amenity'],
    #             default_price=validated_data['default_price'],
    #             property_images=validated_data['property_images'],
    #             onwer=self.r
    #         )
    #     except KeyError as e:
    #         raise ValidationError(
    #             {"detail": "{error} key must be stated in form data".format(error=e)})
    #     return property
