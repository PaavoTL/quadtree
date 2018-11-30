import {Rectangle} from "./quadtree"
import {Point} from "./quadtree"
import {QuadTree} from "./quadtree"

class Engine {
    constructor(){
        document.body.style.margin = "0px";
        document.body.style.overflow = "hidden";

        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");

        this.boundary = new Rectangle(0, 0, this.canvas.width, this.canvas.height);
        this.qTree = new QuadTree(this.boundary, 4);
        this.range = new Rectangle(-100, -100, 100, 100);
        this.points = [];

        this.time = performance.now();
        this.dt = 0;

        this.draw.bind(this);
        window.requestAnimationFrame(this.loop.bind(this));
    }

    clear(){
        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){
        this.clear();
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
        this.ctx.fillText(1/this.dt,10, 10)
    }

    setup(){
        for (let i = 0; i < 1; i++){
            let p = new Point(Math.random()*this.canvas.width,Math.random()*this.canvas.height)
            this.qTree.insert(p);
        }
    }

    loop(){
        this.time = performance.now();
        this.dt = (this.time - this.lastTime) / 1000;
        this.lastTime = this.time;

        this.qTree.move(this.qTree, this.dt);
        this.qTree.check();
        
        this.points = this.qTree.query(this.range);
        
        this.draw();

        window.requestAnimationFrame(this.loop.bind(this));
    }
}

let engine = new Engine();
engine.setup();

// -|- functions -|-

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function draw(event){
    let mousePos = getMousePos(engine.canvas, event);
    let m = new Point(mousePos.x, mousePos.y);
    engine.qTree.insert(m);
}

function move(event){
    let mousePos = getMousePos(engine.canvas, event);
    engine.range.x = mousePos.x - engine.range.w / 2
    engine.range.y = mousePos.y - engine.range.h / 2
}



engine.canvas.addEventListener("mousedown", draw);
engine.canvas.addEventListener("mousemove", move);