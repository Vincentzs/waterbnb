from django.db import models
from django.contrib.auth.models import AbstractUser


class RestifyUser(AbstractUser):
    PHONE = 'phone'
    EMAIL = 'email'
    CONTACT_CHOICES = [
        (PHONE, 'Phone'),
        (EMAIL, 'Email'),
    ]
    phone = models.CharField(max_length=11, blank=True)
    contact_method = models.CharField(
        max_length=5, choices=CONTACT_CHOICES, default=PHONE)
    profile_image = models.ImageField(null=True, upload_to="profile_pictures/")
