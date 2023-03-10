from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
import re
from .models import RestifyUser


class LoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput())

    def clean(self):
        data = super().clean()
        username = data.get('username')
        password = data.get('password')
        try:
            user = authenticate(
                username=username, password=password)
            if not user:
                raise ValidationError({
                    'username': 'Username or password is invalid'
                })
        except KeyError:
            raise ValidationError({
                'username': 'Username or password is invalid'
            })
        data['user'] = user
        return data


class SignupForm(UserCreationForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)
    
    class Meta:
        model = RestifyUser

        fields = ['username', 'first_name', 'last_name', 'email', 'phone', 'contact_method']
        
    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        phone = cleaned_data.get('phone')

        if password1 != password2:
            raise ValidationError('The two password fields didn\'t match')
        else:
            if len(password1) < 8:
                raise ValidationError('This password is too short. It must contain at least 8 characters')
        
        # Check the phone number
        if phone:
            if not re.match(r'^\d{10}$', phone):
                raise ValidationError('Invalid phone number')

        return cleaned_data

    # phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    # phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)