# from django.db import models
# from django.contrib.auth.models import User

# class Reservation(models.Model):
#     check_in = models.DateTimeField()
#     check_out = models.DateTimeField()

#     host = models.ForeignKey(User, on_delete=models.CASCADE)
#     liable_guest = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
#     number_of_guests = models.PositiveIntegerField()
#     host_reservation = models.OneToOneField('HostReservation', on_delete=models.SET_NULL, null=True)
#     guest_reservation = models.OneToOneField('GuestReservation', on_delete=models.SET_NULL, null=True)

# class HostReservation(models.Model):
#     reservation_status = models.CharField(max_length=255)

# class GuestReservation(models.Model):
#     reservation_status = models.CharField(max_length=255)
