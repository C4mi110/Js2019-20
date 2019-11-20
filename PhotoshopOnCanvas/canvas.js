class Photoshop
{
    constructor(targetElementId)
    {
        this.canDraw = false;
        this.brushShapeName = "square";
        this.size = 10;
        this.filterMode = "brightness";
        
        this.canvas = document.querySelector("#" + targetElementId);
        this.ctx = this.canvas.getContext("2d");

        const image = document.getElementById('source');

        image.addEventListener('load', e => {
            this.canvas.height = this.canvas.width * (image.height / image.width);
            this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
            this.imgDataCopy = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        });
        
        this.setupControls();
        this.bindControls();
    }

    saveToFile()
    {
        let dataURL = this.canvas.toDataURL('image/png');
        this.downloadBtn.href = dataURL;
    }


    setFilter(filterMode, value)
    {
        if(value)
            this.ctx.putImageData(this.imgDataCopy, 0, 0);
        this.imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.filter = new Filter(this.imgData, filterMode, value);
        let newImage = this.filter.getFilter();
        this.ctx.putImageData(newImage, 0, 0);
    }

    resetFilter()
    {
        this.ctx.putImageData(this.imgDataCopy, 0, 0);
    }

    setupControls()
    {
        this.downloadBtn = document.querySelector('#downloadBtn');

        this.colorElem = document.querySelector('#brushColor');
        this.sizeElem = document.querySelector('#brushSize');

        this.brushCircle = document.querySelector('#brushCircle');
        this.brushSquare = document.querySelector('#brushSquare');
        this.brushTriangle = document.querySelector('#brushTriangle');

        this.imageUpload = document.querySelector("#imageLoader");
        
    }

    bindControls() 
    {
        this.canvas.addEventListener('mousemove', this.mouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.mouseDisable.bind(this));
        this.canvas.addEventListener('mousedown', this.mouseEnable.bind(this));

        this.colorElem.addEventListener('change', this.changeColor.bind(this));
        this.sizeElem.addEventListener('change', this.changeSize.bind(this));

        this.brushCircle.addEventListener('click', this.brushCircleSet);
        this.brushSquare.addEventListener('click', this.brushSquareSet);
        this.brushTriangle.addEventListener('click', this.brushTriangleSet);
       
        this.imageUpload.addEventListener('change', this.uploadImage);
    }

    mouseEnable(e) 
    {
        this.canDraw = true;

        const mousePos = this.getMousePosition(e);

        this.startX  = mousePos.x;
        this.startY = mousePos.y;

        this.ctx.moveTo(this.startX, this.startY);
    }

    mouseDisable(e) 
    {
        this.canDraw = false;
    }

    mouseMove(e) 
    {
        if (this.canDraw) {

            const mousePos = this.getMousePosition(e);
            this.brushShape = new Brush(this.brushShapeName, this.ctx, mousePos, this.size);   
            this.brushShape.getBrush();          
        }
    }

    getMousePosition(e) 
    {
        const mouseX = e.pageX - this.canvas.offsetLeft;
        const mouseY = e.pageY - this.canvas.offsetTop;

        return {
            x: mouseX,
            y: mouseY
        };
    }

    brushShapeSet(brushShape)
    {
        this.brushShapeName = brushShape;
    }

    changeColor(e) 
    {
        const color = this.colorElem.value;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
    }

    changeSize(e) 
    {
        this.size = this.sizeElem.value;
    }

    uploadImage(e)
    {
    let fileInputControl = e.target;
    let files = fileInputControl.files;
    let firstFile = files[0];
    var reader = new FileReader();      

    reader.addEventListener('load', e => {
        let dataURL = e.target.result;
        document.querySelector("#source").src= dataURL;
    });
    reader.readAsDataURL(firstFile);

    /*
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.ctx.drawImage(img,0,0);
            }
        img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);  
    */
    }

}