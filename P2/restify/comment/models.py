from django.db import models
from user.models import RestifyUser
class Comment(models.Model):
    date = models.DateTimeField()
    commenter = models.ForeignKey(RestifyUser, on_delete=models.CASCADE)
    property_comment = models.OneToOneField('PropertyComment', on_delete=models.SET_NULL, null=True)
    guest_comment = models.OneToOneField('GuestComment', on_delete=models.SET_NULL, null=True)


class PropertyComment(models.Model):
    text = models.CharField(max_length=255)
    reply = models.ForeignKey('HostReplyComment', on_delete=models.SET_NULL, null=True)

class GuestComment(models.Model):
    text = models.CharField(max_length=255)
    reply = models.ForeignKey('HostReplyComment', on_delete=models.SET_NULL, null=True)

class HostReplyComment(models.Model):
    text = models.CharField(max_length=255, null=True)
    reply = models.ForeignKey('GuestReplyComment', on_delete=models.SET_NULL, null=True)

class GuestReplyComment(models.Model):
    text = models.CharField(max_length=255, null=True)