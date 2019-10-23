let canvas;
let Ps;
window.onload= function ()
{
    myPS = new Photoshop("canvas");

    document
        .querySelector("#squareBtn")
        .addEventListener("touchstart", () => {
            myPS.setBrush("square");
        });
    document
        .querySelector("#circleBtn")
        .addEventListener("touchstart", () => {
            myPS.setBrush("circle");
    });
}