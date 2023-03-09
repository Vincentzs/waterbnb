from rest_framework.serializers import ModelSerializer, CharField
from .models import Property

class PropertySerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = ['property_name', 'description', 'owner', 'location', 'available_dates', 'guest_capacity', 'amenities', 'rating', 'price']

    def create(self, validated_data):
        # print(self.context['request'].property)
        return Property.objects.create(validated_data)
    
    def update(self, instance, validated_data):
        instance.property_name = validated_data.get('property_name', instance.property_name)
        instance.description = validated_data.get('description', instance.description)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.location = validated_data.get('location', instance.location)
        instance.available_dates = validated_data.get('available_dates', instance.available_dates)
        instance.guest_capacity = validated_data.get('guest_capacity', instance.guest_capacity)
        instance.amenities = validated_data.get('amenities', instance.amenities)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.price = validated_data.get('price', instance.price)
        instance.save()
        return instance