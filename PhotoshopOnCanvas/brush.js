class Brush {
    constructor(shape, ctx, mousePos, size) {
        this.shape = shape;
        this.ctx = ctx;
        this.mousePos = mousePos;
        this.size = size;

        this.styleBrush();
    }
    getBrush()
    {
        return this.ctx.fill();
    }
    styleBrush() 
    {
        this.ctx.beginPath();
        if (this.shape == 'circle') {
            this.ctx.arc(this.mousePos.x, this.mousePos.y, this.size/2, 0, 2 * Math.PI);
        }
        else if (this.shape == 'square') {
            this.ctx.rect(this.mousePos.x-this.size/2, this.mousePos.y-this.size/2, this.size, this.size);
        }
        else if (this.shape == 'triangle') {
            this.ctx.moveTo(this.mousePos.x, this.mousePos.y); 
            this.ctx.lineTo(this.mousePos.x - this.size, this.mousePos.y);
            this.ctx.lineTo(this.mousePos.x , this.mousePos.y - this.size);
        } 
    }
}