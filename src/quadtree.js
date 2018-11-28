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
}

export class QuadTree {
    constructor(boundary,n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points =[]
    }

    subdivide(){}

    insert(point) {
        if (this.points.length < this.capacity) {
            this.points.push(point);
        } else {
            this.subdivide();
        }
    }
}