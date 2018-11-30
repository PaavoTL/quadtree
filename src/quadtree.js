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
        return (point.x >= this.x &&
            point.x <= this.x + this.w &&
            point.y >= this.y &&
            point.y <= this.y + this.h);
    }

    intersects(range){
        return !(range.x > this.x + this.w ||
            range.x + range.w < this.x ||
            range.y > this.y + this.h ||
            range.y + range.h < this.y);
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

        let nw = new Rectangle(x,y,w/2,h/2);
        this.northWest = new QuadTree(nw, this.capacity);
        let ne = new Rectangle(x+w/2,y,w/2,h/2);
        this.northEast = new QuadTree(ne, this.capacity);
        let sw = new Rectangle(x,y+h/2,w/2,h/2);
        this.southWest = new QuadTree(sw, this.capacity);
        let se = new Rectangle(x+w/2,y+h/2,w/2,h/2);
        this.southEast = new QuadTree(se, this.capacity);
        
        this.divided = true;
    }

    insert(point) {
        
        if (!this.boundary.contains(point)){
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            if (!this.divided){
                this.subdivide();
            }

            this.northWest.insert(point);
            this.northEast.insert(point);
            this.southWest.insert(point);
            this.southEast.insert(point);
        }
    }

    query(range,found){
        if (!found){
            found = [];
        }
        
        if(!this.boundary.intersects(range)){
            // empty array
            return found;
        } else {
            for (let p of this.points){
                if (range.contains(p)) {
                    found.push(p);
                }
            }

            if (this.divided){
                this.northWest.query(range, found);
                this.northEast.query(range, found);
                this.southWest.query(range, found);
                this.southEast.query(range, found);
            }

            return found;
        }
    }

    show(ctx){
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
        if (this.divided){
            if (this.northWest.show(ctx)){return true;}
            else if (this.northEast.show(ctx)){return true;}
            else if (this.southWest.show(ctx)){return true;}
            else if (this.southEast.show(ctx)){return true;}
        }
        ctx.fillStyle = "white"
        
        for (let p of this.points){
            ctx.beginPath()
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI, false);
            ctx.closePath()
            ctx.fill();
        }
    }
}