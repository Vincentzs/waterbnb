from rest_framework import serializers
from .models import Comment
from property.models import Property
from user.models import RestifyUser
from django.utils.timezone import now

# from user.serializers import UserSerializer
# from datetime import datetime

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment

#     def create(self, validated_data):
#         property_comment_data = validated_data.pop('property_comment', None)
#         guest_comment_data = validated_data.pop('guest_comment', None)

#         comment = Comment.objects.create(**validated_data)

#         if property_comment_data:
#             PropertyComment.objects.create(comment=comment, **property_comment_data)

#         if guest_comment_data:
#             GuestComment.objects.create(comment=comment, **guest_comment_data)

#         return comment

class CommentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    commenter = serializers.ReadOnlyField(source='commenter.id')
    property = serializers.ReadOnlyField(source='property.id')

    class Meta:
        model = Comment
        fields = '__all__'

    # def create(self, validated_data):
    #     return Comment.objects.create(**validated_data)
