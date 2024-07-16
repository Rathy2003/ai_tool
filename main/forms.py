from django import forms
from .models import ImageUploadModel

class UploadImageForm(forms.ModelForm):
    class Meta:
        model = ImageUploadModel
        fields = ["image"]