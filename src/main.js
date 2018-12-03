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

        this.ctx.fillStyle = "#303030";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.setup.bind(this);
    }

    setup(){
        for(let i = 0; i < 100; i++){
            let p = new Point(Math.random(this.canvas.width),Math.random(this.canvas.height))
            qt.insert(p)
        }
    }
}

let engine = new Engine();

let boundary = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
let qt = new QuadTree(boundary, 4);

engine.setup();

console.log(qt);
console.log(engine.ctx);

qt.show(engine.ctx);


