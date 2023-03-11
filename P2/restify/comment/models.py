from django.db import models
from user.models import RestifyUser
from property.models import Property
from django.utils.timezone import now

class Comment(models.Model):
    added_date = models.DateTimeField(default=now, editable=False)
    commenter = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name="commenter")
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="property", default=None)
    guest_property_comment = models.OneToOneField('GuestPropertyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)
    # host_guest_comment = models.OneToOneField('HostGuestComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

    def __str__(self):
        return '%s - %s' % (self.property.property_name, self.commenter.first_name)

    # def clean(self):
    #     if self.property_comment is not None and self.guest_comment is not None:
    #         raise ValidationError('Only one of property_comment or guest_comment can be set')

    # class Meta:
    #     ordering = ['date']

class GuestPropertyComment(models.Model):
    text = models.TextField()
    reply = models.OneToOneField('HostPropertyReplyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

class HostPropertyReplyComment(models.Model):
    text = models.TextField()
    reply = models.OneToOneField('GuestPropertyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

class GuestPropertyReplyComment(models.Model):
    text = models.TextField()


# class HostGuestComment(models.Model):
#     text = models.CharField(max_length=255)

# class Comment(models.Model):
#     date = models.DateTimeField(auto_now_add=True, null=True)
#     commenter = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name="guest")
#     property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="property")
#     property_comment = models.OneToOneField('PropertyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)
#     guest_comment = models.OneToOneField('GuestComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

#     def clean(self):
#         if self.property_comment is not None and self.guest_comment is not None:
#             raise ValidationError('Only one of property_comment or guest_comment can be set')


# class PropertyComment(models.Model):
#     text = models.CharField(max_length=255)
#     reply = models.ForeignKey('HostReplyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

# class GuestComment(models.Model):
#     text = models.CharField(max_length=255)

# class HostReplyComment(models.Model):
#     text = models.CharField(max_length=255, null=True)
#     reply = models.ForeignKey('GuestReplyComment', on_delete=models.SET_NULL, null=True, blank=True, default=None)

# class GuestReplyComment(models.Model):
#     text = models.CharField(max_length=255, null=True)