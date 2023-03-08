from rest_framework import serializers
from notification.models import Notification

class notificationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField(style={'base_template': 'textarea.html'})
    read = serializers.BooleanField(required=False)
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    notification_type = serializers.CharField()

    def create(self, validated_data):
        """Create and return a new `Notification` instance"""
        return Notification.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and return an existing `Notification` instance"""
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.read = validated_data.get('read', instance.read)
        instance.notification_type = validated_data.get('notification_type', instance.notification_type)
        instance.save()
        return instance