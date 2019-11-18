document.addEventListener("DOMContentLoaded", appStart)
let canvas;
let ctx;
let imageUpload;

let isPainting = false;
let lastX, lastY;
let brushType = "square";
let brushColor;
let brushSize;
var bVal = -10;
let mode="brightness";

function appStart()
{
    canvas = new Photoshop("canvas");

    //BRUSHES
    document
        .querySelector("#brushSquare")
        .addEventListener("click", () => {
            canvas.brushShapeSet("square");
    });
    document
        .querySelector("#brushCircle")
        .addEventListener("click", () => {
            canvas.brushShapeSet("circle");
    });
    document
        .querySelector("#brushTriangle")
        .addEventListener("click", () => {
            canvas.brushShapeSet("triangle");
    });


    var rangeslider = document.querySelector("#sliderRange");
    var outputRange = document.querySelector("#rangeText");
    outputRange.innerHTML = rangeslider.value;

    rangeslider.oninput = function() {
    outputRange.innerHTML = this.value;
    }

    var brushsizeRange = document.querySelector("#brushSize");
    var outputBrush = document.querySelector("#rangeTextBrush");
    outputBrush.innerHTML = brushsizeRange.value;

    brushsizeRange.oninput = function() {
    outputBrush.innerHTML = this.value;
    }


    //FILTERS
    document
    .querySelector("#sliderRange")
    .addEventListener("change", () => {
        canvas.setFilter(mode, parseInt(rangeslider.value));
    });

    document
        .querySelector("#brightnessBtn")
        .addEventListener("click", () => {
            mode="brightness"
            rangeslider.value=0;
    });
    document
        .querySelector("#contrastBtn")
        .addEventListener("click", () => {
            mode="contrast"
            rangeslider.value=0;
    });
    document
        .querySelector("#blackNwhiteBtn")
        .addEventListener("click", () => {
            canvas.setFilter("blackNwhite");
    });
    document
        .querySelector("#negativeBtn")
        .addEventListener("click", () => {
            canvas.setFilter("negative");
    });
    document
    .querySelector("#sepiaBtn")
    .addEventListener("click", () => {
        canvas.setFilter("sepia");
    });
    document
        .querySelector("#thresholdBtn")
        .addEventListener("click", () => {
            canvas.setFilter("threshold");
    });
    document
        .querySelector("#sharpenBtn")
        .addEventListener("click", () => {
            canvas.setFilter("sharpen");
    });
    document
        .querySelector("#blurBtn")
        .addEventListener("click", () => {
            canvas.setFilter("blur");
    });

    document
        .querySelector("#resetStyleBtn")
        .addEventListener("click", () => {
            canvas.resetFilter();
    });
    document
        .querySelector("#downloadBtn")
        .addEventListener("click", () => {
            canvas.saveToFile();
    });



}