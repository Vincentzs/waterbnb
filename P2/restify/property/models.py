from django.db import models
from user.models import RestifyUser
class Property(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    guest_capacity = models.PositiveIntegerField()

    description = models.CharField(max_length=200)
    rating = models.PositiveIntegerField()

    owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE)




