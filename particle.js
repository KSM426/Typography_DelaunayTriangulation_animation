import { Vector } from "./vector.js";


export class Particle {
    constructor() {
        
    }
    
    resize(w, h, pos, bg, typ) {
        const SIDE = (3 + Math.round(Math.random()) * 2) * 4;
        
        this.stageWidth = w;
        this.stageHeight = h;
        this.pos = pos;
        this.bg = bg;
        this.typ = typ;
        this.points = [];

        this.superTriangle = [new Vector(this.stageWidth / 2, - this.stageHeight), new Vector( - this.stageWidth / 2, this.stageHeight), new Vector(this.stageWidth * 3 / 2, this.stageHeight)]
        this.points = [];
        for(let i=0; i<3; i++) {
            this.points[i] = this.superTriangle[i];
        }
        
        for(let i=0; i<SIDE / 4; i++) {
            const L = SIDE / 4;
            this.points.push(new Vector(this.stageWidth / L * i, 1));
            this.points.push(new Vector(this.stageWidth - 1, this.stageHeight / L * i));
            this.points.push(new Vector(this.stageWidth - this.stageWidth / L * i, this.stageHeight - 1));
            this.points.push(new Vector(1, this.stageHeight - this.stageHeight / L * i));
        }
        
        for(let i=0; i<this.bg; i++) {
            this.points.push(this.randomPoints());
        }

        for(let i=0; i<this.typ; i++) {
            this.points.push(this.pos[Math.round(Math.random() * this.pos.length)]);
        }

        return this.points;
    }

    randomPoints() {
        return new Vector(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
    }
}