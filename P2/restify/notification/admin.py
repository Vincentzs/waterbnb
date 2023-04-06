from django.contrib import admin
from .models import Notification

# Register your models here.
# class regNot(admin.ModelAdmin):
#     list_display = ['user','date','title','read']

admin.site.register(Notification) 