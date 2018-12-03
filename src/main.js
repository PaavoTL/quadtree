import Engine from "./engine.js"

let engine = new Engine;

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
    engine.makePoint(mousePos.x, mousePos.y);
}

function move(event){
    let mousePos = getMousePos(engine.canvas, event);
    engine.range.x = mousePos.x - engine.range.w / 2
    engine.range.y = mousePos.y - engine.range.h / 2
}



engine.canvas.addEventListener("mousedown", draw);
engine.canvas.addEventListener("mousemove", move);