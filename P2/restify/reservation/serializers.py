from rest_framework import serializers
from reservation.models import Reservation

class reservationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    check_in = serializers.DateTimeField()
    check_out = serializers.DateTimeField()
    number_of_guests = serializers.IntegerField(min_value=0)
    reservation_status = serializers.CharField(required=False, allow_blank=True, max_length=100)

    def create(self, validated_data):
        """Create and return a new `Notification` instance"""
        return Reservation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and return an existing `Notification` instance"""
        instance.check_in = validated_data.get('check_in', instance.check_in)
        instance.check_out = validated_data.get('check_out', instance.check_out)
        instance.number_of_guests = validated_data.get('number_of_guests', instance.number_of_guests)
        instance.reservation_status = validated_data.get('reservation_status', instance.reservation_status)
        instance.save()
        return instance