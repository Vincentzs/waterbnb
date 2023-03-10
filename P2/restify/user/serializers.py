from rest_framework import serializers
from .models import RestifyUser
from rest_framework.exceptions import ValidationError


class CreateUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = RestifyUser
        fields = ['username', 'password1', 'password2', 'first_name',
                  'last_name', 'profile_image', 'email', 'phone', 'contact_method']

    def create(self, validated_data):
        if validated_data['password1']:
            if len(validated_data['password1']) < 8:
                raise ValidationError({'password1': ["This password is too short. "
                                                     "It must contain at least 8 characters"]})
            if validated_data['password1'] != validated_data['password2']:
                raise ValidationError(
                    {'password1': ["The two password fields didn't match"]})

        try:
            user = RestifyUser.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password1'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                profile_image=validated_data['profile_image'],
                email=validated_data['email'],
                phone=validated_data['phone'],
                contact_method=validated_data['contact_method'],
            )
        except KeyError as e:
            raise ValidationError(
                {"detail": "{error} key must be stated in form data".format(error=e)})
        return user


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestifyUser
        fields = ['first_name', 'last_name', 'profile_image',
                  'email', 'phone', 'contact_method']
