from rest_framework import serializers
from .models import Comment
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
    class Meta:
        model = Comment
        fields = ['id', 'property', 'commenter', 'text']

    def create(self, validated_data):
        try:
            new_comment = Comment.objects.create(
                commenter=validated_data['commenter'],
                property=validated_data['property'],
                text=validated_data['text']
            )
        except KeyError as e:
            raise serializers.ValidationError({"detail": "{error} key must be stated in form data".format(error=e)})
        self.context['request'].user.save()
        return new_comment
