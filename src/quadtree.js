export class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

export class Rectangle {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return (point.x >= this.x - this.w &&
            point.x <= this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y <= this.y + this.h);
    }
}

export class QuadTree {
    constructor(boundary,n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    subdivide(){
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nw = new Rectangle(x-w/2, y-h/2, w/2, h/2);
        this.northWest = new QuadTree(nw, this.capacity);
        let ne = new Rectangle(x+w/2, y-h/2, w/2, h/2);
        this.northEast = new QuadTree(ne, this.capacity);
        let sw = new Rectangle(x-w/2, y+h/2, w/2, h/2);
        this.southWest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(x+w/2, y+h/2, w/2, h/2);
        this.southEast = new QuadTree(se, this.capacity);
        this.divided = true;
    }

    insert(point) {
        if(!this.boundary.contains(point)){
            return;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if(!this.divided){
                this.subdivide();
            }
            
            this.northWest.insert(point);
            this.northEast.insert(point);
            this.southWest.insert(point);
            this.southEast.insert(point);
        }
    }

    show(ctx){
        ctx.strokeStyle = "white";
        ctx.
        ctx.strokeRect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if(this.divided){
            this.northWest.show(ctx);
            this.northEast.show(ctx);
            this.southWest.show(ctx);
            this.southWest.show(ctx);
        }
    }
}