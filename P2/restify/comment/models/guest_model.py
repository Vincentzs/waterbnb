from django.db import models
from user.models import RestifyUser
from property.models import Property
from django.core.validators import MaxValueValidator, MinValueValidator


class HostToGuestComment(models.Model):
    host_commenter = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, null=False, blank=False, related_name="host_commenter")
    guest = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, null=False, blank=False, related_name="guest")
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, null=False, blank=False)
    added_date = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=300, null=False, blank=False)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=False, blank=False,
        help_text="Rating from 1 to 5 for this guest"
    )

    def __str__(self):
        return 'ID: %s | %s (%s) - %s (%s) TO %s (%s)' % (self.id, self.property.property_name, self.property.id, self.host_commenter.username, self.host_commenter.id, self.guest.username, self.guest.id)
