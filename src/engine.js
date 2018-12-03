import {Rectangle} from "./quadtree"
import {Point} from "./quadtree"
import {QuadTree} from "./quadtree"

export default class Engine {
    constructor(){
        document.body.style.margin = "0px";
        document.body.style.overflow = "hidden";

        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.boundary = new Rectangle(0, 0, this.canvas.width, this.canvas.height);
        this.qTree = new QuadTree(this.boundary, 2);
        this.range = new Rectangle(-100, -100, 100, 100);
        this.points = [];
        this.allPoints = [];

        this.time = performance.now();
        this.dt = 0;
        this.count = 0;

        this.draw.bind(this);
        window.requestAnimationFrame(this.loop.bind(this));
    }

    makePoint(x,y){
        let p = new Point(x,y)
        this.qTree.insert(p);
    }

    draw(){
        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.qTree.show(this.ctx);

        this.ctx.strokeStyle = "green";
        this.ctx.strokeRect(this.range.x, this.range.y, this.range.w, this.range.h);

        for (let p of this.points){
            this.ctx.fillStyle = "green"
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI, false);
            this.ctx.closePath();
            this.ctx.fill();
        }

        this.ctx.fillStyle = "green";
        this.font = "50px";
        this.ctx.fillText(1/this.dt,10, 10);
        this.ctx.fillText(this.allPoints.length, 10, 20);
    }

    random(n = 1){
        for (let i = 0; i < n; i++){
            let x = Math.random()*this.canvas.width;
            let y = Math.random()*this.canvas.height;
            this.makePoint(x,y);
        }
    }

    loop(){
        this.count ++;

        this.time = performance.now();
        this.dt = (this.time - this.lastTime) / 1000;
        this.lastTime = this.time;

        this.random();
        this.qTree.update(this.qTree, this.qTree, this.dt, this.points);
        
        this.points = this.qTree.query(this.range);
        this.draw();

        window.requestAnimationFrame(this.loop.bind(this));   
    }
}