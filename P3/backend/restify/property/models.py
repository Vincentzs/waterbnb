from django.db import models
from user.models import RestifyUser
from multiselectfield import MultiSelectField
from multiselectfield.validators import MaxValueMultiFieldValidator

class Property(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    property_name = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(RestifyUser, on_delete=models.SET_NULL, null=True, blank=True)
    property_images = models.JSONField(blank=True, default=list, null=True)
    default_price = models.PositiveIntegerField()
    
    # filters
    CHOICES_LOCATION = (
        ("AB", "Alberta"),
        ("BC", "British Columbia"),
        ("MB", "Manitoba"),
        ("NB", "New Brunswick"),
        ("NL", "Newfoundland and Labrador"),
        ("NT", "Northwest Territories"),
        ("NS", "Nova Scotia"),
        ("NU", "Nunavut"),
        ("ON", "Ontario"),
        ("PE", "Prince Edward Island"),
        ("QC", "Quebec"),
        ("SK", "Saskatchewan"),
        ("YT", "Yukon"),
    )
    location = models.CharField(max_length=2, choices=CHOICES_LOCATION)
    available_dates = models.JSONField(default=list)
    guest_capacity = models.PositiveIntegerField()
    AMENITY_CHOICES = [
        ("pool", "Pool"),
        ("hottub", "Hottub"),
        ("gym", "Gym"),
        ("parking", "Parking"),
        ("oceanview", "OceanView"),
        ("restaurant", "Restaurant"),
        ("wifi", "Wifi"),
        ("tv", "TV"),
        ("kitchen", "Kitchen"),
        ("laundry", "Laundry"),
        ("pets", "Pets"),
        ("smoking", "Smoking"),
        ("airconditioning", "AirConditioning"),
        ("heating", "Heating")]
    amenity = MultiSelectField(choices=AMENITY_CHOICES, max_length=255)

    # order by
    rating_choices = [(i, str(i)) for i in range(6)]
    rating = models.PositiveIntegerField(choices=rating_choices, default=0)

    def __str__(self):
        return '%s (%s)' % (self.property_name, self.id)
