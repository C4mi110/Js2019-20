class Filter {
    constructor(imgData, filterName, value) {
        this.imgData = imgData;
        this.filterName = filterName;
        this.value = value;

        this.setFilter();
    }

    getFilter()
    {
        return this.imgData;
    }

    setFilter()
    {
        
        switch (this.filterName)
        {
            case "brightness":
            for (var i = 0 ; i < this.imgData.data.length; i += 4)
            {
                this.imgData.data[i] += this.value;
                this.imgData.data[i+1] += this.value;
                this.imgData.data[i+2] += this.value;
            }
            break
            case "contrast":
                let factor = (259 * (this.value + 255)) / (255 * (259 - this.value));

                for (var i = 0 ; i < this.imgData.data.length; i += 4)
                {
                    this.imgData.data[i] = factor * (this.imgData.data[i] - 128) + 128;
                    this.imgData.data[i+1] = factor * (this.imgData.data[i+1] - 128) + 128;
                    this.imgData.data[i+2] = factor * (this.imgData.data[i+2] - 128) + 128;
                }
            break
            case "blackNwhite":
            for (var i = 0 ; i < this.imgData.data.length; i += 4)
                {
                    let grayScale = (this.imgData.data[i]+this.imgData.data[i+1]+this.imgData.data[i+3])/3;
                    this.imgData.data[i] = grayScale;
                    this.imgData.data[i+1] = grayScale;
                    this.imgData.data[i+2] = grayScale;
                }
            break
            case "negative":
            for (var i = 0 ; i < this.imgData.data.length; i += 4)
                {
                    this.imgData.data[i] =  255-this.imgData.data[i];
                    this.imgData.data[i+1] = 255-this.imgData.data[i+1];
                    this.imgData.data[i+2] = 255-this.imgData.data[i+2];
                }
            break
            case "sepia":
            for (var i = 0 ; i < this.imgData.data.length; i += 4)
                {
                    this.imgData.data[i] =  (this.imgData.data[i] * 0.393) + (this.imgData.data[i+1] * 0.769) + (this.imgData.data[i+2] * 0.189);
                    this.imgData.data[i+1] = (this.imgData.data[i] * 0.349) + (this.imgData.data[i+1] * 0.686) + (this.imgData.data[i+2] * 0.168);
                    this.imgData.data[i+2] = (this.imgData.data[i] * 0.272) + (this.imgData.data[i+1] * 0.534) + (this.imgData.data[i+2] * 0.131);
                }
            break
            case "threshold":
            for (var i = 0 ; i < this.imgData.data.length; i += 4)
                {
                    if ((0.2126*this.imgData.data[i] + 0.7152*this.imgData.data[i+1] + 0.0722*this.imgData.data[i+2] >= 128))
                        this.imgData.data[i] = this.imgData.data[i+1] = this.imgData.data[i+2] = 255;
                    else
                        this.imgData.data[i] = this.imgData.data[i+1] = this.imgData.data[i+2] = 0;
                }
            break
            case "sharpen":
                let tmpCanvas = document.createElement('canvas');
                let tmpCtx = tmpCanvas.getContext('2d');

                let weights = 
                [  0, -1,  0,
                  -1,  5, -1,
                   0, -1,  0 ];
                let opaque = 0.5;   
                var side = Math.round(Math.sqrt(weights.length));
                var halfSide = Math.floor(side/2);
                var src = this.imgData.data
                var sw = this.imgData.width;
                var sh = this.imgData.height;
                // pad output by the convolution matrix
                var w = sw;
                var h = sh;
                var output = tmpCtx.createImageData(w,h);
                var dst = output.data;
                // go through the destination image pixels
                var alphaFac = opaque ? 1 : 0;
                for (var y=0; y<h; y++) {
                  for (var x=0; x<w; x++) {
                    var sy = y;
                    var sx = x;
                    var dstOff = (y*w+x)*4;
                    // calculate the weighed sum of the source image pixels that
                    // fall under the convolution matrix
                    var r=0, g=0, b=0, a=0;
                    for (var cy=0; cy<side; cy++) {
                      for (var cx=0; cx<side; cx++) {
                        var scy = sy + cy - halfSide;
                        var scx = sx + cx - halfSide;
                        if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                          var srcOff = (scy*sw+scx)*4;
                          var wt = weights[cy*side+cx];
                          r += src[srcOff] * wt;
                          g += src[srcOff+1] * wt;
                          b += src[srcOff+2] * wt;
                          a += src[srcOff+3] * wt;
                        }
                      }
                    }
                    dst[dstOff] = r;
                    dst[dstOff+1] = g;
                    dst[dstOff+2] = b;
                    dst[dstOff+3] = a + alphaFac*(255-a);
                  }
                }
                this.imgData = output;
            break
        }
    }
}