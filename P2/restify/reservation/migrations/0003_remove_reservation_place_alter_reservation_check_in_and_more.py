# Generated by Django 4.1.7 on 2023-03-09 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0002_alter_reservation_reservation_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservation',
            name='place',
        ),
        migrations.AlterField(
            model_name='reservation',
            name='check_in',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='check_out',
            field=models.DateField(),
        ),
    ]
