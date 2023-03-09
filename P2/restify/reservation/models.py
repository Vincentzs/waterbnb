from django.db import models
from django.contrib.auth.models import User
from property.models import Property
from django.utils import timezone

RES_STATUS = (
    ('pending', 'Pending'),
    ('denied', 'Denied'),
    ('expired', 'Expired'),
    ('approved', 'Approved'),
    ('canceled', 'Canceled'),
    ('terminated', 'Terminated'),
    ('completed', 'Completed'),
)

class Reservation(models.Model):
    check_in = models.DateField()
    check_out = models.DateField()
    host = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosts')
    liable_guest = models.ForeignKey(User, on_delete=models.CASCADE, related_name='guests')
    # place = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='places')
    number_of_guests = models.PositiveIntegerField(default=0)
    reservation_status = models.CharField(max_length=25, choices=RES_STATUS, default='pending')

    def check_reservation_status(self):
        if self.reservation_status == 'pending' and self.check_in < timezone.now().date():
            self.reservation_status = 'expired'
            self.save()

    def __str__(self):
        return f"res_id:{self.id}-Hosted by:{self.host}"

    class Meta:
        ordering = ['check_in']
    
