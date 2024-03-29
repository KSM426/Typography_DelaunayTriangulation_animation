import { DelaunayTriangulation } from "./DelaunayTriangulation.js";
import { Text } from "./text.js";
import { Particle } from "./particle.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        WebFont.load({
            google: {
                families: ['Hind:700']
            },
            fontactive: () => {
                this.text = new Text();
                this.particle = new Particle();
                this.DelaunayTriangulation = new DelaunayTriangulation();

                window.addEventListener('resize', this.resize.bind(this), false);
                this.resize();

                requestAnimationFrame(this.animate.bind(this));
            }
        });

    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.pos = this.text.setText('R', 5, this.stageWidth, this.stageHeight);
        this.points = this.particle.resize(this.stageWidth, this.stageHeight, this.pos, 20, 400);
        this.DelaunayTriangulation.resize(this.stageWidth, this.stageHeight, this.points);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.DelaunayTriangulation.animate(this.ctx);
    }
}

window.onload = () => {
    new App();
}