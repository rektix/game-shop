from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User

# Create your models here.
class Game(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=512)
    genre = models.TextField(max_length=512)
    price = models.FloatField()
    score = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        db_table = "games"

class User(models.Model):
    username = models.CharField(max_length=512)
    password = models.CharField(max_length=512)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "users"

class Purchase(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return self.user.username + ' ' + self.game.name

    class Meta:
        db_table = "purchase"
