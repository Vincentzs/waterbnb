# Generated by Django 4.1.7 on 2023-03-09 01:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0003_remove_reservation_place_alter_reservation_check_in_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reservation',
            options={'ordering': ['check_in']},
        ),
    ]
