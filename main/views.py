from django.shortcuts import render,HttpResponse,get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .forms import UploadImageForm
import os
from rembg import remove
from .models import ImageUploadModel



# Create your views here.
def main(req):
    return render(req,"index.html")


@csrf_exempt
def process_imag(req):
    if req.method == "POST":
        form = UploadImageForm(req.POST,req.FILES)
        if form.is_valid():
            image_upload = form.save()
            input_path = image_upload.image.path
            output_dir = os.path.join("media","output")
            filename = os.path.basename(image_upload.image.name)
            output_path = os.path.join(output_dir,filename)

            if not os.path.exists(output_dir):
                os.makedirs(output_dir)
            with open(input_path,"rb") as i:
                input_image = i.read()
            output_image = remove(input_image)
            with open(output_path, 'wb') as o:
                o.write(output_image)
             # Update model with processed image path
            image_upload.output_image = os.path.join('output',filename )
            image_upload.save()
            obj = get_object_or_404(ImageUploadModel, id=image_upload.id)
            return JsonResponse({"output_image":obj.output_image.url,"input_image":obj.image.url})
    return HttpResponse("asgd")