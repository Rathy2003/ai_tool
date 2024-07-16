$(document).ready(function () {
    let image = null;
    let rp_image=null;
    let isShowOriginalImage = false;
    $(document).on("change","#choose_image",function(e){
        let img = document.querySelector("#img");
        image = e.target.files[0];
        if(image.type == "image/png" || image.type == "image/jpeg"){
            $("#img").attr("src",URL.createObjectURL(e.target.files[0]))
            let dragArea = document.querySelector("#drag-area");
            dragArea.classList.add("hidden")
            img.classList.remove("hidden");
            let label_choose = document.querySelector("#lb_choose_image");
            label_choose.classList.add("hidden")
            removeBg();
        }else{
            alert("only support .jpg or .png")
        }
        
    })


    const removeBg = () =>{
        let btn_before_after = document.querySelector("#btn_before_after");
        const loading = document.querySelector("#loading");
        loading.classList.remove("hidden")
        let formData = new FormData()
        formData.append("image",image);
        console.log(image);
        $.ajax({
            type:"POST",
            url: "/upload/",
            data: formData,
            processData: false,
            contentType:false,
            enctype:"mulipart/form-data",
            success: function (response) {
                if(response.output_image){
                    let img = document.querySelector("#img");
                    img.src= response.output_image
                    loading.classList.add("hidden")
                    btn_before_after.classList.remove("hidden")
                    rp_image = response;
                    $("#download_btn").attr("href",response.output_image)
                    let btn_close = document.querySelector("#btn_close")
                    btn_close.classList.remove("hidden")
                    let download_btn = document.querySelector("#download_btn")
                    download_btn.classList.remove("hidden")
                }
            },
        });
    }


    let dragArea = document.querySelector("#drag-area");

    dragArea.addEventListener("dragover",function(e){
        e.preventDefault();
    });

    dragArea.addEventListener("drop",function(e){
        e.preventDefault();
        let temp = e.dataTransfer.files;
        image = temp[0];
        if(image.type == "image/png" || image.type == "image/jpeg"){
            $("#img").attr("src",URL.createObjectURL(image))
            img.classList.remove("hidden");
            dragArea.classList.add("hidden");
            removeBg();
        }else{
            alert("only support .jpg or .png")
        }
        
    });


    let btn_before_after = document.querySelector("#btn_before_after");
    btn_before_after.addEventListener("click",function(){
        isShowOriginalImage = !isShowOriginalImage;
        if(isShowOriginalImage)
        {
            $("#img").attr("src",rp_image.input_image)
            btn_before_after.style.color =  "black";
        }
        
        else
        {
            $("#img").attr("src",rp_image.output_image)
            btn_before_after.style.color =  "#4f4f4f";
        }
    })

    $(document).on("click","#btn_close",function(){
        btn_before_after.classList.add("hidden")
        let img = document.querySelector("#img");
        img.classList.add("hidden")
        let dragArea = document.querySelector("#drag-area");
        dragArea.classList.remove("hidden")
        let label_choose = document.querySelector("#lb_choose_image");
        label_choose.classList.remove("hidden")
        let btn_close = document.querySelector("#btn_close")
        btn_close.classList.add("hidden")
        let download_btn = document.querySelector("#download_btn")
        download_btn.classList.add("hidden")
    })
});