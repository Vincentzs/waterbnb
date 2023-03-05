from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError


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
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'first_name', 'last_name', 'email' 'phone_numer', 'contact_method']
    # phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    # phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)