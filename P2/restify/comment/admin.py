from django.contrib import admin
from .models.property_model import Comment
from .models.guest_model import HostToGuestComment

# Register your models here.
admin.site.register(Comment)
admin.site.register(HostToGuestComment)