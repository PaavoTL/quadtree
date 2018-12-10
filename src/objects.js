import {Rectangle} from "./quadtree"
import {Circle} from "./quadtree"
import {Point} from "./quadtree"

export class Particle {
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.highLight = false;

        this.boundary = new Circle(x,y,this.r);
    }

    intersects(other) {
        let a = this.x - other.x;
        let b = this.y - other.y;

        let d = Math.sqrt(a*a + b*b);
        return (d < (this.r + other.r));
    }

    update(dt, others){
        
        let hit = false
        
        for (let other of others){
            if (other !== this && this.intersects(other)){
                hit = true;
            }

            if (hit){
                this.highLight = true;
                other.highLight = true;
            }
        }

        this.x += (Math.random()-0.5)*1;
        this.y += (Math.random()-0.5)*1;
        this.boundary.x = this.x;
        this.boundary.y = this.y;
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