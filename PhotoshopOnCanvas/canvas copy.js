document.addEventListener("DOMContentLoaded", appStart)
let canvas;
let ctx;
let imageUpload;

let isPainting = false;
let lastX, lastY;
let brushType = "square";
let brushColor;
let brushSize;

function appStart()
{
    canvas = document.querySelector("#canvas");
    imageUpload = document.querySelector("#fileToUpload");
    imageUpload.addEventListener("change", uploadImage);
    brushColor = document.querySelector("#brushColor");
    brushSize = document.querySelector("#brushSize");

    document
        .querySelector("#darken")
        .addEventListener("click", () => darkenFilter());

    document
        .querySelector("#lighten")
        .addEventListener("click", () => lightenFilter());
    document
        .querySelector("#saturationPlus")
        .addEventListener("click", () => saturationPlus());

    document
        .querySelector("#saturationMinus")
        .addEventListener("click", () => saturationMinus());
    document
        .querySelector("#greenScreen")
        .addEventListener("click", () => greenScreen());
    document
        .querySelector("#invert")
        .addEventListener("click", () => invertColors());
    document
        .querySelector("#blackNwhite")
        .addEventListener("click", () => blackNwhite());

    ctx = canvas.getContext("2d");
    
    canvas.addEventListener("mousedown", (e) => {
        isPainting = true;
        Draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
    });
    canvas.addEventListener("mousemove", (e) => {
        Draw(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)
    });

    canvas.addEventListener("mouseup", (e) => {
        isPainting = false;
    });

    document
        .querySelector("#brushSquare")
        .addEventListener("click", brushSquare)
    document
        .querySelector("#brushCircle")
        .addEventListener("click", brushCircle)
    document
        .querySelector("#brushTriangle")
        .addEventListener("click", brushTriangle)
}

function uploadImage()
{
    const image = new Image();
    file = imageUpload.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        image.src = e.target.result;
        image.addEventListener("load", () => {
            ctx.drawImage(image, 0, 0)
        })
      }
    reader.readAsDataURL(file);
}

function Draw(x, y)
{
    if(isPainting)
    {
        ctx.beginPath();
        ctx.fillStyle = brushColor.value;

        switch (brushType)
        {
            case "square":
                ctx.rect(lastX-brushSize.value/2, lastY-brushSize.value/2, brushSize.value, brushSize.value);
                break;
            case "circle":
                ctx.arc(lastX, lastY, brushSize.value/2, 0, 2 * Math.PI);
                break;
            case "triangle":
                ctx.moveTo(lastX, lastY); 
                ctx.lineTo(lastX-brushSize.value, lastY);
                ctx.lineTo(lastX, lastY-brushSize.value);
                break;
        }
        
        ctx.fill();


        /*
        ctx.strokeStyle = brushColor.value;
        ctx.lineWidth = 1;
        ctx.lineJoin = brushType;
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();*/
    }/*
    if(isDown)
    {
        const brush = new Image();
        brush.src = brushType;
        ctx.drawImage(brush, lastX, lastY);

    }*/
    lastX = x; lastY = y;
}

function brushSquare()
{
    //brushType = "../brushes/square.png";
    brushType = "square";
}
function brushCircle()
{
    //brushType = "../brushes/circle.png";
    brushType = "circle";
}
function brushTriangle()
{
    //brushType = "../brushes/triangle.png";
    brushType = "triangle";
}

function darkenFilter(amount = 30)
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        canvasData.data[i] -= amount;
        canvasData.data[i+1] -= amount;
        canvasData.data[i+2] -= amount;
        //canvasData.data[i+3] -= amount;
    }
    ctx.putImageData(canvasData, 0, 0);
}

function lightenFilter(amount = 30)
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        canvasData.data[i] += amount;
        canvasData.data[i+1] += amount;
        canvasData.data[i+2] += amount;
        //canvasData.data[i+3] += amount;
    }
    ctx.putImageData(canvasData, 0, 0);
}

function saturationPlus(amount = 30)
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        canvasData.data[i+1] += amount;
        canvasData.data[i+2] += amount;
    }
    ctx.putImageData(canvasData, 0, 0);
}
function saturationMinus(amount = 30)
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        if ( canvasData.data[i] >= 126) canvasData.data[i] -= amount;
        else if ( canvasData.data[i] < 126) canvasData.data[i] += amount;
        if ( canvasData.data[i+1] >= 126) canvasData.data[i+1] -= amount;
        else if ( canvasData.data[i+1] < 126) canvasData.data[i+1] += amount;
        if ( canvasData.data[i+2] >= 126) canvasData.data[i+2] -= amount;
        else if ( canvasData.data[i+2] < 126) canvasData.data[i+2] += amount;
    }
    ctx.putImageData(canvasData, 0, 0);
}

function greenScreen()
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        if(canvasData.data[i+1]==255) canvasData.data[i+3]=0;
    }
    ctx.putImageData(canvasData, 0, 0);
}

function invertColors()
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        canvasData.data[i] = 255-canvasData.data[i];
        canvasData.data[i+1] = 255-canvasData.data[i+1];
        canvasData.data[i+2] = 255-canvasData.data[i+2];
        //canvasData.data[i+3] += amount;
    }
    ctx.putImageData(canvasData, 0, 0);
}

function blackNwhite()
{
    const canvasData = ctx.getImageData(0,0,canvas.width, canvas.height);
    for (let i = 0 ; i < canvasData.data.length; i += 4)
    {
        let gray = (canvasData.data[i]+canvasData.data[i+1]+canvasData.data[i+2])/3;
        canvasData.data[i] = gray;
        canvasData.data[i+1] = gray;
        canvasData.data[i+2] = gray;
        //canvasData.data[i+3] += amount;
    }
    ctx.putImageData(canvasData, 0, 0);
}