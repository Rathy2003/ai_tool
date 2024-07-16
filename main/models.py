from django.db import models

# Create your models here.
class ImageUploadModel(models.Model):
    image = models.ImageField(upload_to="images/")
    output_image = models.ImageField(upload_to="output/",null=True,blank=True)
