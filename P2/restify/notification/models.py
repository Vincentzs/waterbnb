from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Notification(models.Model):

    NOTIFICATION_TYPE_CHOICES = (
        ('reservation', 'Reservation'),
        ('cancellation', 'Cancellation'),
        ('approval', 'Approval'),
    )
    user = models.ForeignKey(User, related_name='notifications',on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    read = models.BooleanField(default=False)
    text = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPE_CHOICES, default='')

    def __str__(self):
        return f"{self.title}"

    class Meta:
        ordering = ['date']
