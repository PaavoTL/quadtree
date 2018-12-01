export class Point {
    constructor(x,y,sx,sy){
        this.x = x;
        this.y = y;
        this.xspeed = sx || (Math.random() - 0.5) * 100;
        this.yspeed = sy || (Math.random() - 0.5) * 100;
        this.check = true;
    }

    pmove(dt){
        this.x += this.xspeed * dt;
        this.y += this.yspeed * dt;
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
        let ne = new Rectangle(x+w/2,y,w/2,h/2);
        let sw = new Rectangle(x,y+h/2,w/2,h/2);
        let se = new Rectangle(x+w/2,y+h/2,w/2,h/2);
        
        this.northWest = new QuadTree(nw, this.capacity+1);
        this.northEast = new QuadTree(ne, this.capacity+1);
        this.southWest = new QuadTree(sw, this.capacity+1);
        this.southEast = new QuadTree(se, this.capacity+1);
        
        this.divs = [this.northWest,this.northEast,this.southWest,this.southEast];
        
        this.divided = true;
        

        for(let p of this.points){ 
            Loop:
            for (let div of this.divs){
                if (div.insert(p)){break Loop;}
            }
        }

        this.points = [];
    }

    insert(point) {
        
        if (!this.boundary.contains(point)){
            return false;
        }

        if (this.points.length < this.capacity && !this.divided) {
            this.points.push(point);
        } else {
            if (!this.divided){
                this.subdivide();
            }

            if(this.northWest.insert(point)){return true}
            else if (this.northEast.insert(point)){return true;}
            else if (this.southWest.insert(point)){return true;}
            else if (this.southEast.insert(point)){return true;}
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

    check(){
        if (this.divs.some(div => {return div.divided;})){
            return true
        }

        if (this.points.length + 
            this.northWest.points.length +
            this.northEast.points.length +
            this.southWest.points.length +
            this.southEast.points.length <= this.capacity){
                for(let div of this.divs){
                    for(let point of div.points){
                        this.points.push(point);
                    }
                }
            delete this.divs[0-3]
            this.divided = false;
            
            return false;
        } else {
            return true;
        }
    }

    move(qTree, parent, dt){
        let count = 0

        for (let p of this.points){
            p.pmove(dt);
            
            if(!this.boundary.contains(p) && p.check){
                qTree.insert(p);  
                this.points.splice(count,1);
            }
            count ++;
        }
    }

    update(qtree, parent, dt, points){
        if (this.divided && this.check()){
            for(let div of this.divs){
                div.update(qtree, this, dt, points);
            }
        } else {
            this.move(qtree, parent, dt);
        }
    }

    show(ctx){
        ctx.strokeStyle = "#434343";
        ctx.strokeRect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);
        if (this.divided){
            this.northWest.show(ctx);
            this.northEast.show(ctx);
            this.southWest.show(ctx);
            this.southEast.show(ctx); 
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