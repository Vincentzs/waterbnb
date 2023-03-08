from rest_framework import serializers
from .models import MyUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone', 'contact_method', 'profile_image']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_image': {'required': False},
        }

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            contact_method=validated_data.get('contact_method', ''),
            profile_image=validated_data.get('profile_image', None),
        )
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.contact_method = validated_data.get('contact_method', instance.contact_method)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.save()
        return instance

