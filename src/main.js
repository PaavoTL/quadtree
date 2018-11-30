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

        this.clear.bind(this);
        this.clear()
    }

    clear(){
        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(){
        this.clear();
        qTree.show(this.ctx);

        this.ctx.strokeStyle = "green";
        this.ctx.strokeRect(range.x, range.y, range.w, range.h);

        for (let p of points){

            
            this.ctx.fillStyle = "green"
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI, false);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    setup(){
        for (let i = 0; i < 100; i++){
            let p = new Point(Math.random()*this.canvas.width,Math.random()*this.canvas.height)
            qTree.insert(p);
        }
    }
}

let engine = new Engine();
let boundary = new Rectangle(0, 0, engine.canvas.width, engine.canvas.height);
let qTree = new QuadTree(boundary, 4);
let points = [];

engine.setup();
console.log(qTree);

let range = new Rectangle(-100, -100, 100, 100)

engine.draw();



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
    qTree.insert(m);
    points = qTree.query(range);
    engine.draw();
}

function move(event){
    points = [];

    let mousePos = getMousePos(engine.canvas, event);
    range.x = mousePos.x - range.w / 2
    range.y = mousePos.y - range.h / 2

    points = qTree.query(range);

    engine.draw();  
}

engine.canvas.addEventListener("mousedown", draw);
engine.canvas.addEventListener("mousemove", move);