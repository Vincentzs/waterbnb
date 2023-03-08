from django.db import models
from django.contrib.auth.models import User
from property.models import Property

class Reservation(models.Model):
    RES_STATUS = (
        ('pending', 'Pending'),
        ('denied', 'Denied'),
        ('expired', 'Expired'),
        ('approved', 'Approved'),
        ('canceled', 'Canceled'),
        ('terminated', 'Terminated'),
        ('completed', 'Completed'),
    )
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosts')
    liable_guest = models.ForeignKey(User, on_delete=models.CASCADE, related_name='guests')
    place = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='places')
    number_of_guests = models.PositiveIntegerField(default=0)
    reservation_status = models.CharField(max_length=20, choices=RES_STATUS, default='pending')
