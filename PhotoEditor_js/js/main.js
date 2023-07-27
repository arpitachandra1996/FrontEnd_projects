let choose_img_Btn = document.querySelector(".choose_img button");
let choose_input = document.querySelector(".choose_img input");
let imgSrc = document.querySelector('.view_img img');
let filter_buttons = document.querySelectorAll('.icons_room button');
let slider = document.querySelector('.slider input');
let filter_name = document.querySelector('.filter_info .name');
let slider_value = document.querySelector('.filter_info .value');
let reset = document.querySelector('.reset');
let save = document.querySelector('.save');

let brightness = 100,
    contrast = 100, 
    invert = 0,
    blur = 0 ;



choose_img_Btn.addEventListener('click', () => choose_input.click()); //after clicking choose image btn file will opne
choose_input.addEventListener('change', ()=> {
    // console.log(5+5); console to check if working
    // console.log(choose_Input.files[0]) we will get file name in zero
    let file = choose_input.files[0]; // 
    if (!file) return;
    imgSrc.src = URL.createObjectURL(file);
    imgSrc.addEventListener('load', () => {
        document.querySelector('.container').classList.remove('disabled'); //
    });
});

 filter_buttons.forEach((element) => {
    element.addEventListener('click', ()=> {
        document.querySelector('.active').classList.remove('active');
        element.classList.add('active');
        filter_name.innerText = element.id;
        if (element.id === 'brightness'){
            // console.log("allright");
            slider.max = '200';
            slider.value = brightness;
            slider_value.innerText = `${brightness}`; //templates literal
        } else if (element.id === 'contrast'){
            slider.max = '200';
            slider.value = contrast;
            slider_value.innerText = `${contrast}`;
        } else if (element.id === 'invert'){
           slider.max = '100';
           slider.value = invert;
           slider_value.innerText = `${invert}`;
       } else if (element.id === 'blur'){
           slider.max = '100';
           slider.value = blur;
           slider_value.innerText = `${blur}`;
       }
    });
 });

 slider.addEventListener('input', () => {
    slider_value.innerText = `${slider.value}%`;
    let sliderState = document.querySelector('.icons_room .active');
    if (sliderState.id === 'brightness') {
        brightness = slider.value;
    } else if (sliderState.id === 'contrast'){
        contrast = slider.value;
    } else if (sliderState.id === 'invert'){
        invert = slider.value;
    } else if (sliderState.id === 'blur'){
        blur = slider.value;
    }
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${invert}%) blur(${blur}px)`;
 });

 reset.addEventListener('click', () => {
    brightness = '100';
    contrast = '100';
    invert = '0';
    blur = '0';

    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${invert}%) blur(${blur}px)`;
 });


 save.addEventListener('click', ()=> {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
   // console.log(imgsrc.naturalWidth);
    canvas.width = imgSrc.naturalHeight;
    canvas.height = imgSrc.naturalWidth;
    //console.log(imgsrc.naturalHeight);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) invert(${invert}%) blur(${blur}%)`;
    ctx.translate (canvas.width / 2, canvas.height / 2);
    ctx.drawImage(
        imgSrc,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    );
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
 });
 