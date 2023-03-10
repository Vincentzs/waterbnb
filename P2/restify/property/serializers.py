from rest_framework.serializers import ModelSerializer, CharField
from .models import Property
from rest_framework.exceptions import ValidationError


class CreatePropertySerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = ['property_name', 'description', 'owner', 'location',
                  'available_dates', 'guest_capacity', 'amenities', 'rating', 'price', "property_images"]

    def create(self, validated_data):
        try:
            property = Property.objects.create(
                property_name=validated_data['property_name'],
                description=validated_data['description'],
                owner=validated_data['owner'],
                location=validated_data['location'],
                available_dates=validated_data['available_dates'],
                guest_capacity=validated_data['guest_capacity'],
                amenities=validated_data['amenities'],
                rating=validated_data['rating'],
                price=validated_data['price'])
        except KeyError as e:
            raise ValidationError(
                {"detail": "{error} key must be stated in form data".format(error=e)})
        return property
