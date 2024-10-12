from django.conf import settings
from django.db import models

class Product(models.Model):
    # Пример других полей модели
    title = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Используйте AUTH_USER_MODEL
    # Добавьте другие поля по вашему усмотрению

    def __str__(self):
        return self.title