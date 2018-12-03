import Engine from "./engine.js"
import {Particle} from  "./objects.js"

let eng = new Engine;

eng.update = (dt) => {
    
}

// -|- functions -|-

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function draw(event){
    let mousePos = getMousePos(eng.canvas, event);
    
    eng.makeParticle(mousePos.x, mousePos.y, 100)

    // eng.makePoint(mousePos.x, mousePos.y);
}

function move(event){
    let mousePos = getMousePos(eng.canvas, event);
    eng.range.x = mousePos.x - eng.range.w / 2
    eng.range.y = mousePos.y - eng.range.h / 2
}

eng.canvas.addEventListener("mousedown", draw);
eng.canvas.addEventListener("mousemove", move);