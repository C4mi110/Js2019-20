class Photoshop
{
    constructor(targetElementId)
    {
        this.canvas = document.querySelector("#" + targetElementId);
        this.canvas.addEventListener("touchmove", (e) => this.onTouchMove(e));
        this.brushShapeName = "square";
    }

    onTouchMove(e)
    {
    this.brushShape = new Brush(this.brushShapeName);
    const brush = this.brushShape.getBrush();

    const x = e.touches[0].clientX - this.canvas.offsetLeft;
    const y = e.touches[0].clientY - this.canvas.offsetTop;
    brush.style.top = y + "px";
    brush.style.left = x + "px";

    this.canvas.appendChild(brush);      
    }

    setBrush(brushShape)
    {
        this.brushShapeName = brushShape;
    }
}