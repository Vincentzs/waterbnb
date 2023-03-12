from django.db import models
from user.models import RestifyUser
from property.models import Property
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError


class Comment(models.Model):
    commenter = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, null=False, blank=False)
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, null=False, blank=False)
    added_date = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=300, null=False, blank=False)
    # rating = models.IntegerField(
    #     validators=[MinValueValidator(1), MaxValueValidator(5),], null=False, blank=False)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=None,
        null=True, blank=True,
        help_text="Rating from 0 to 5 for this comment. Replies cannot have a rating."
    )
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        ordering = ['-added_date']

    def __str__(self):
        return 'ID: %s | %s (%s) - %s (%s)' % (self.id, self.property.property_name, self.property.id, self.commenter.username, self.commenter.id)

    # replies
    def children(self):
        return Comment.objects.filter(parent=self)

    def is_parent(self):
        if self.parent is None:
            return True
        return False

    def clean(self):
        super().clean()
        if self.parent and self.rating:
            raise ValidationError(
                "Comments with parent cannot have rating value.")
        if not self.parent and not self.rating:
            raise ValidationError(
                "Comments without parent must have a rating value.")




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
