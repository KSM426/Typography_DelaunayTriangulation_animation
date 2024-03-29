import { Vector } from "./vector.js";
import { Line } from "./line.js";
import { Triangle } from "./triangle.js";


export class DelaunayTriangulation {
    constructor() {
    
    }
    
    resize(w, h, points) {
        this.stageWidth = w;
        this.stageHeight = h;
        this.points = points;

        this.triangles = [];
        this.triangles[0] = new Triangle(0, 1, 2);

        for (let i=3; i<this.points.length; i++) {
            let point = this.points[i];
            let edges = [];
    
            for (let j=this.triangles.length - 1; j>=0; j--) {
                this.triangles = this.triangles.filter((triangle, j) => {
                    if (this.checkCircumscriber(triangle, point)) {
                        edges.push(new Line(triangle.a, triangle.b), new Line(triangle.b, triangle.c), new Line(triangle.c, triangle.a));
                        return false;
                    }
                    return true;
                });
            }
            
            let unique = [];
            let duplicates = [];
            for (let value of edges) {
                let reversedLine = new Line(value.e, value.s);
            
                if (
                    unique.some(line => line.s === value.s && line.e === value.e) || 
                    unique.some(line => line.s === reversedLine.s && line.e === reversedLine.e)
                ) {
                    duplicates.push(value);
                    duplicates.push(reversedLine);
                } else {
                    unique.push(value);
                }
            }
            unique = unique.filter(value => !duplicates.some(line => 
                (line.s === value.s && line.e === value.e) || 
                (line.s === value.e && line.e === value.s)
            ));
            edges = unique;

            for (let j=0; j <edges.length; j++) {
                let newTri = new Triangle(edges[j].s, edges[j].e, i);
                this.triangles.push(newTri);
            }
        }

        for(let i=this.triangles.length - 1; i>=0; i--) {
            if(this.triangles[i].a == 0 || this.triangles[i].a == 1 || this.triangles[i].a == 2 ||
                this.triangles[i].b == 0 || this.triangles[i].b == 1 || this.triangles[i].b == 2 ||
                this.triangles[i].c == 0 || this.triangles[i].c == 1 || this.triangles[i].c == 2) {
                    this.triangles.splice(i, 1);
            }
            this.triangles[i].color = "#" + Math.round(Math.random() * 0xffffff).toString(16);
        }
    }

    checkCircumscriber(t, x) {
        const circumcenter = new Vector().circumcenter(this.points[t.a], this.points[t.b], this.points[t.c]);

        if(new Vector().distance(x, circumcenter.v) <= circumcenter.r){
            return true;
        }

        return false;
    }

    animate(ctx) {
        ctx.strokeStyle = '#000000';
        
        for(let i=0; i<this.triangles.length; i++) {
            ctx.fillStyle = this.triangles[i].color;
            ctx.beginPath();
            ctx.moveTo(this.points[this.triangles[i].a].x, this.points[this.triangles[i].a].y);
            ctx.lineTo(this.points[this.triangles[i].b].x, this.points[this.triangles[i].b].y);
            ctx.lineTo(this.points[this.triangles[i].c].x, this.points[this.triangles[i].c].y);
            ctx.lineTo(this.points[this.triangles[i].a].x, this.points[this.triangles[i].a].y);
            ctx.closePath();
            ctx.stroke();
            ctx.fill()
        }
    }
}
