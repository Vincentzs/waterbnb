from rest_framework import serializers
from ..models.guest_model import HostToGuestComment

class HostToGuestCommentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    host_commenter = serializers.ReadOnlyField(source='host_commenter.id')
    guest = serializers.ReadOnlyField(source='guest.id')
    property = serializers.ReadOnlyField(source='property.id')

    class Meta:
        model = HostToGuestComment
        fields = ['id', 'host_commenter', 'guest', 'property', 'added_date', 'rating', 'text']