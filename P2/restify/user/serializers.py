from rest_framework import serializers
from .models import RestifyUser
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class CreateUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = RestifyUser
        fields = ['id', 'username', 'password1', 'password2', 'first_name',
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
        fields = ['id','first_name', 'last_name', 'profile_image',
                  'email', 'phone', 'contact_method']


class EditUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, required=False)
    password2 = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = RestifyUser
        fields = ['password1', 'password2', 'first_name', 'last_name',
                  'profile_image', 'email', 'phone', 'contact_method']

    def update(self, instance, validated_data):
        if 'password1' in validated_data:
            if len(validated_data['password1']) < 8:
                raise ValidationError({'password1': ["This password is too short. "
                                                     "It must contain at least 8 characters"]})
            if validated_data['password1'] != validated_data['password2']:
                raise ValidationError(
                    {'password1': ["The two password fields didn't match"]})

            instance.set_password(validated_data['password1'])
            instance.profile_image = validated_data.get(
                'profile_image', instance.profile_image)
            validated_data.pop('password1', None)
            validated_data.pop('password2', None)
            instance.save()

        return super().update(instance, validated_data)

# class LogOutSerializer(serializers.Serializer):
#     refresh = serializers.CharField()
#     def validate(self, attrs):
#         self.token = attrs['refresh']
#         return attrs
    
#     def save(self, **kwargs):
#         try:
#             RefreshToken(self.token).blacklist()
#         except TokenError:
#             self.fail('bad token')

# class LogOutSerializer(serializers.Serializer):
#     refresh = serializers.CharField()

#     default_error_messages = {
#         'bad_token': ('Token is invalid or expired')
#     }

#     def validate(self, attrs):
#         self.token = attrs['refresh']
#         return attrs

#     def save(self, **kwargs):
#         try:
#             RefreshToken(self.token).blacklist()
#         except TokenError:
#             self.fail('bad_token')