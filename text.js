import { Vector } from "./vector.js";

export class Text{
    constructor() {
        this.canvas = document.createElement("canvas");
        // this.canvas.style.position = 'absolute';
        // this.canvas.style.top = '0';
        // this.canvas.style.left = '0';
        // document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
    }
    
    setText(str, density, stageWidth, stageHeight) {
        this.canvas.width = stageWidth;
        this.canvas.height = stageHeight;

        const myText = str;
        const fontWidth = 400;
        const fontSize = 700;
        const fontName = 'Hind';
        
        this.ctx.clearRect(0, 0, stageWidth, stageHeight);
        this.ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
        this.ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
        this.ctx.textBaseline = `middle`;
        const fontPos = this.ctx.measureText(myText);
        this.ctx.fillText(
            myText,
            (stageWidth - fontPos.width) / 2,
            fontPos.actualBoundingBoxAscent +
            fontPos.actualBoundingBoxDescent +
            (stageHeight - fontSize) / 2
        )
            
        return this.dotPos(density, stageWidth, stageHeight, fontPos, fontSize);
    }

    dotPos(density, stageWidth, stageHeight, fontPos, fontSize) {
        const imageData = this.ctx.getImageData(0, 0, stageWidth, stageHeight).data;

        const particles = [];
        let i = 0;
        let width = 0;
        let pixel;

        for(let height=0; height<stageHeight; height += density) {
            ++i;
            const slide = (i % 2) == 0;
            width = 0;
            if(slide == 1) {
                width += 6;
            }
            
            for(width; width<stageWidth; width += density) {
                pixel = imageData[((width + (height * stageWidth)) * 4) - 1];
                if(pixel != 0 && width > 0 && width < stageWidth && height > 0 && height < stageHeight) {
                    particles.push(new Vector(width, height));
                }
            }
        }

        return particles;
    }
}