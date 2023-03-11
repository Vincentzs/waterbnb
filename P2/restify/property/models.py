from django.db import models
from user.models import RestifyUser


class Property(models.Model):
    property_name = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE)
    property_images = models.JSONField(blank=True, default=list)

    # filters
    location = models.CharField(max_length=200)
    available_dates = models.JSONField(default=list)
    guest_capacity = models.PositiveIntegerField()
    AMENITY_CHOICES = [
        ("pool", "Pool"),
        ("hottub", "Hottub"),
        ("gym", "Gym"),
        ("parking", "Parking"),
        ("oceanview", "OceanView"),
        ("restaurant", "Restaurant")]
    amenities = models.CharField(
        max_length=20, choices=AMENITY_CHOICES, default='')

    # order by
    rating = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField(default=0)

    def __str__(self):
        return '%s (%s)' % (self.property_name, self.id)


# class Amenity(models.Model):
#     name = models.CharField(max_length=20)
