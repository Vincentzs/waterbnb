from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
from PIL import Image

class RestifyUser(AbstractUser):
    PHONE = 'phone'
    EMAIL = 'email'
    CONTACT_CHOICES = [
        (PHONE, 'Phone'),
        (EMAIL, 'Email'),
    ]
    phone = models.CharField(max_length=10, blank=True)
    contact_method = models.CharField(max_length=5, choices=CONTACT_CHOICES, default=PHONE)
    profile_image = models.ImageField(upload_to='profile_images', blank=True, null=True)

    def save(self, *args, **kwargs):
        super(RestifyUser, self).save(*args, **kwargs)
        if self.profile_image:
            img = Image.open(self.profile_image.path)
            if img.height > 300 or img.width > 300:
                output_size = (300, 300)
                img.thumbnail(output_size)
                img.save(self.profile_image.path)
