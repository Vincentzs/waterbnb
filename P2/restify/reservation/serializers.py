from rest_framework import serializers
from reservation.models import Reservation,RES_STATUS
from property.models import Property
from user.models import RestifyUser

class reservationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    check_in = serializers.DateField(required=True)
    check_out = serializers.DateField(required=True)
    host = serializers.PrimaryKeyRelatedField(queryset=RestifyUser.objects.all())
    liable_guest = serializers.PrimaryKeyRelatedField(queryset=RestifyUser.objects.all())
    number_of_guests = serializers.IntegerField(min_value=0)
    reservation_status = serializers.ChoiceField(choices=RES_STATUS, default='pending')
    place = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all(),default="")

    def validate(self, obj):
        errors = {}
        # if obj['check_in'] is None:
        #     errors['check_in'] = 'Check-in date is required'
        # if obj['check_out'] is None:
        #     errors['check_out'] = 'Check-out date is required'
        if obj['check_in'] > obj['check_out']:
            errors['date_range'] = 'Check-out date cannot be before check-in date'
        if obj['host'] == obj['liable_guest']:
            errors['Own property'] = 'Cannot reserve your own property'
        if errors:
            raise serializers.ValidationError(errors)
        return obj

    def create(self, validated_data):
        """Create and return a new `Notification` instance"""
        return Reservation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and return an existing `Notification` instance"""
        instance.check_in = validated_data.get('check_in', instance.check_in)
        instance.check_out = validated_data.get('check_out', instance.check_out)
        instance.number_of_guests = validated_data.get('number_of_guests', instance.number_of_guests)
        instance.host = validated_data.get('host', instance.host)
        instance.liable_guest = validated_data.get('liable_guest', instance.liable_guest)
        instance.place = validated_data.get('place', instance.place)
        instance.reservation_status = validated_data.get('reservation_status', instance.reservation_status)
        instance.save()
        return instance
    