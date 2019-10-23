class Brush {
    constructor(shape) {
        this.shape = shape;
        this.brush = document.createElement("div");
        this.styleBrush();
    }
    getBrush()
    {
        return this.brush
    }
    styleBrush() 
    {
        const className = this.shape + "-brush";
        this.brush.classList.add("brush", className);
    }
}