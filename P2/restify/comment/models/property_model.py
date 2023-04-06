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
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        default=0,
        null=True, blank=True,
        help_text="Rating from 0 to 5 for this comment. Replies cannot have a rating."
    )
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE, null=True, blank=True,
        help_text="Empty means that this is a comment, o/w it is a reply.")

    class Meta:
        ordering = ['-added_date']

    def __str__(self):
        return 'ID: %s | %s (%s) - %s (%s)' % (self.id, self.property.property_name, self.property.id, self.commenter.username, self.commenter.id)

    # replies
    def children(self):
        return Comment.objects.filter(parent=self)

    # check if this is a comment
    def is_parent(self):
        if self.parent is None:
            return True
        return False
