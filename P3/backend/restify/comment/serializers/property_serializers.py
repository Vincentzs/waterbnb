from rest_framework import serializers
from ..models.property_model import Comment
from ..models.guest_model import HostToGuestComment
from property.models import Property
from user.models import RestifyUser
from django.utils.timezone import now


class CommentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    commenter = serializers.ReadOnlyField(source='commenter.id')
    property = serializers.ReadOnlyField(source='property.id')
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'parent', 'commenter', 'property',
                  'added_date', 'rating', 'text', 'reply_count']

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0


class CommentChildSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    commenter = serializers.ReadOnlyField(source='commenter.id')
    rating = serializers.IntegerField(read_only=True)
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'commenter', 'added_date',
                  'rating', 'text', 'reply_count']

    def get_reply_count(self, obj):
        if obj.is_parent:
            return obj.children().count()
        return 0


class CommentDetailSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    id = serializers.IntegerField(read_only=True)
    commenter = serializers.ReadOnlyField(source='commenter.id')
    rating = serializers.IntegerField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'parent', 'commenter',
                  'added_date', 'rating', 'text', "replies"]

    def get_replies(self, obj):
        if obj.is_parent:
            return CommentChildSerializer(obj.children(), many=True).data
        return None
