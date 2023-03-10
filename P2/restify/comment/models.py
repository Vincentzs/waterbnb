from django.db import models
from user.models import RestifyUser
from django.core.exceptions import ValidationError

class Comment(models.Model):
    date = models.DateTimeField()
    commenter = models.ForeignKey(RestifyUser, on_delete=models.CASCADE)
    property_comment = models.OneToOneField('PropertyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)
    guest_comment = models.OneToOneField('GuestComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

    def clean(self):
        if self.property_comment is not None and self.guest_comment is not None:
            raise ValidationError('Only one of property_comment or guest_comment can be set')


class PropertyComment(models.Model):
    text = models.CharField(max_length=255)
    reply = models.ForeignKey('HostReplyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

class GuestComment(models.Model):
    text = models.CharField(max_length=255)

class HostReplyComment(models.Model):
    text = models.CharField(max_length=255, null=True)
    reply = models.ForeignKey('GuestReplyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

class GuestReplyComment(models.Model):
    text = models.CharField(max_length=255, null=True)