from django.db import models
from property.models import Property
from django.utils import timezone
from user.models import RestifyUser

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
    host = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='hosts')
    liable_guest = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name='guests')
    # place = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='places',null=True)
    number_of_guests = models.PositiveIntegerField(default=0)
    _reservation_status = models.CharField(max_length=25, choices=RES_STATUS, default='pending', db_column="reservation_status")

    @property
    def reservation_status(self):
        if self._reservation_status == 'pending' and self.check_in < timezone.now().date():
            self._reservation_status = 'expired'
        return self._reservation_status

    @reservation_status.setter
    def reservation_status(self, value):
        self._reservation_status = value

    def __str__(self):
        return f"res_id:{self.id}-Hosted by:{self.host}"

    class Meta:
        ordering = ['check_in']
    
