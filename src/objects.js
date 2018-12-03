import {Rectangle} from "./quadtree"
import {Circle} from "./quadtree"
import {Point} from "./quadtree"

export class Particle {
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = 20;
        this.highLight = false;

        this.boundary = new Circle(x,y,this.r);
    }

    intersects(other) {
        let a = this.x - other.x;
        let d = dist(this.x, this.y, other.x, other.y);
        return (d < this.r + other.r);
    }

    update(dt, others){
        
        for (let other of others){
            if (other !== this && this.intersects(other)){
                this.highLight = true; 
            } else {
                this.highLight = false; 
            }
        }
    }

    show(ctx){
        if (this.highLight){
            ctx.fillStyle = "#999999";
        } else {
            ctx.fillStyle = "#555555";
        }
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath()
        ctx.fill();
    }
}