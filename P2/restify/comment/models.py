from django.db import models
from django.contrib.auth.models import User

class Comment(models.Model):
    date = models.DateTimeField()
    commenter = models.ForeignKey(User, on_delete=models.CASCADE)
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

class GuestReplyComment(models.Model):
    text = models.CharField(max_length=255, null=True)