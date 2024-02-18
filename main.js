// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Box setup
let origin, vp1, vp2, vp3;
let placing = 0;

let cornerSize1 = .5,
    cornerSize2 = .5,
    cornerSize3 = .5;
let corner1, corner2, corner3;
let computedCorner1, computedCorner2, computedCorner3, backCorner;

let dragging = false;

function draw(event) {
    ctx.fillStyle = "rgb(16 16 16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(242 242 242)";
    ctx.strokeStyle = "rgb(127 127 127)";

    if (corner1) {
        if (vp2) drawLine(corner1.x, corner1.y, vp2.x, vp2.y);
        if (vp3) drawLine(corner1.x, corner1.y, vp3.x, vp3.y);
    }
    if (corner2) {
        if (vp1) drawLine(corner2.x, corner2.y, vp1.x, vp1.y);
        if (vp3) drawLine(corner2.x, corner2.y, vp3.x, vp3.y);
    }
    if (corner3) {
        if (vp1) drawLine(corner3.x, corner3.y, vp1.x, vp1.y);
        if (vp2) drawLine(corner3.x, corner3.y, vp2.x, vp2.y);
    }

    if (computedCorner1) {
        ctx.fillStyle = "rgb(255 255 0)";
        drawCircle(computedCorner1.x, computedCorner1.y);
    }
    if (computedCorner2) {
        ctx.fillStyle = "rgb(0 255 255)";
        drawCircle(computedCorner2.x, computedCorner2.y);
    }
    if (computedCorner3) {
        ctx.fillStyle = "rgb(255 0 255)";
        drawCircle(computedCorner3.x, computedCorner3.y);
    }

    ctx.strokeStyle = "rgb(242 242 242)";
    if (dragging) {
        if (placing == 0) {
            ctx.fillStyle = "rgb(242 242 242)";
            drawCircle(event.pageX, event.pageY);

            if (vp1) {
                ctx.fillStyle = "rgb(255 0 0)";
                drawLine(event.pageX, event.pageY, vp1.x, vp1.y);
                drawCircle(vp1.x, vp1.y);
                drawCircle(interoplate(vp1.x, event.pageX, cornerSize1), interoplate(vp1.y, event.pageY, cornerSize1));
            }

            if (vp2) {
                ctx.fillStyle = "rgb(0 255 0)";
                drawLine(event.pageX, event.pageY, vp2.x, vp2.y);
                drawCircle(vp2.x, vp2.y);
                drawCircle(interoplate(vp2.x, event.pageX, cornerSize2), interoplate(vp2.y, event.pageY, cornerSize2));
            }
    
            if (vp3) {
                ctx.fillStyle = "rgb(0 0 255)";
                drawLine(event.pageX, event.pageY, vp3.x, vp3.y);
                drawCircle(vp3.x, vp3.y);
                drawCircle(interoplate(vp3.x, event.pageX, cornerSize3), interoplate(vp3.y, event.pageY, cornerSize3));
            }
        } else if (placing == 1) {
            ctx.fillStyle = "rgb(242 242 242)";
            drawCircle(origin.x, origin.y);

            ctx.fillStyle = "rgb(255 0 0)";
            drawLine(origin.x, origin.y, event.pageX, event.pageY);
            drawCircle(event.pageX, event.pageY);
            drawCircle(interoplate(event.pageX, origin.x, cornerSize1), interoplate(event.pageY, origin.y, cornerSize1));

            if (vp2) {
                ctx.fillStyle = "rgb(0 255 0)";
                drawLine(origin.x, origin.y, vp2.x, vp2.y);
                drawCircle(vp2.x, vp2.y);
                drawCircle(corner2.x, corner2.y);
            }
    
            if (vp3) {
                ctx.fillStyle = "rgb(0 0 255)";
                drawLine(origin.x, origin.y, vp3.x, vp3.y);
                drawCircle(vp3.x, vp3.y);
                drawCircle(corner3.x, corner3.y);
            }
        } else if (placing == 2) {
            ctx.fillStyle = "rgb(242 242 242)";
            drawCircle(origin.x, origin.y);

            ctx.fillStyle = "rgb(255 0 0)";
            drawLine(origin.x, origin.y, vp1.x, vp1.y);
            drawCircle(vp1.x, vp1.y);
            drawCircle(corner1.x, corner1.y);

            ctx.fillStyle = "rgb(0 255 0)";
            drawLine(origin.x, origin.y, event.pageX, event.pageY);
            drawCircle(event.pageX, event.pageY);
            drawCircle(interoplate(event.pageX, origin.x, cornerSize2), interoplate(event.pageY, origin.y, cornerSize2));

            if (vp3) {
                ctx.fillStyle = "rgb(0 0 255)";
                drawLine(origin.x, origin.y, vp3.x, vp3.y);
                drawCircle(vp3.x, vp3.y);
                drawCircle(corner3.x, corner3.y);
            }
        } else {
            ctx.fillStyle = "rgb(242 242 242)";
            drawCircle(origin.x, origin.y);
            
            ctx.fillStyle = "rgb(255 0 0)";
            drawLine(origin.x, origin.y, vp1.x, vp1.y);
            drawCircle(vp1.x, vp1.y);
            drawCircle(corner1.x, corner1.y);
            
            ctx.fillStyle = "rgb(0 255 0)";
            drawLine(origin.x, origin.y, vp2.x, vp2.y);
            drawCircle(vp2.x, vp2.y);
            drawCircle(corner2.x, corner2.y);
            
            ctx.fillStyle = "rgb(0 0 255)";
            drawLine(origin.x, origin.y, event.pageX, event.pageY);
            drawCircle(event.pageX, event.pageY);
            drawCircle(interoplate(event.pageX, origin.x, cornerSize3), interoplate(event.pageY, origin.y, cornerSize3));
        }
    } else {
        if (origin) {
            ctx.fillStyle = "rgb(242 242 242)";
            drawCircle(origin.x, origin.y);
        }

        if (vp1) {
            ctx.fillStyle = "rgb(255 0 0)";
            drawLine(origin.x, origin.y, vp1.x, vp1.y);
            drawCircle(vp1.x, vp1.y);
        }

        if (vp2) {
            ctx.fillStyle = "rgb(0 255 0)";
            drawLine(origin.x, origin.y, vp2.x, vp2.y);
            drawCircle(vp2.x, vp2.y);
        }

        if (vp3) {
            ctx.fillStyle = "rgb(0 0 255)";
            drawLine(origin.x, origin.y, vp3.x, vp3.y);
            drawCircle(vp3.x, vp3.y);
        }

        if (corner1) {
            ctx.fillStyle = "rgb(255 0 0)";
            drawCircle(corner1.x, corner1.y);
        }
        
        if (corner2) {
            ctx.fillStyle = "rgb(0 255 0)";
            drawCircle(corner2.x, corner2.y);
        }

        if (corner3) {
            ctx.fillStyle = "rgb(0 0 255)";
            drawCircle(corner3.x, corner3.y);
        }
    }

    if (origin && computedCorner1 && computedCorner2 && computedCorner3) {
        ctx.fillStyle = "rgb(127 127 127)";
        drawLine(backCorner.x, backCorner.y, computedCorner1.x, computedCorner1.y); 
        drawLine(backCorner.x, backCorner.y, computedCorner2.x, computedCorner2.y); 
        drawLine(backCorner.x, backCorner.y, computedCorner3.x, computedCorner3.y); 
        drawCircle(backCorner.x, backCorner.y);

        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(corner2.x, corner2.y);
        ctx.lineTo(computedCorner2.x, computedCorner2.y);
        ctx.lineTo(corner3.x, corner3.y);
        ctx.closePath();
        ctx.fill();
    }
}

canvas.addEventListener('mousedown', (event) => {
    dragging = true;

    switch (placing) {
        case 0:
            origin = null;
            break;
        case 1:
            vp1 = null;
            break;
        case 2:
            vp2 = null;
            break;
        case 3:
            vp3 = null;
            break;
    }

    draw(event);
});

canvas.addEventListener('mouseup', (event) => {
    dragging = false;

    switch (placing) {
        case 0:
            origin = vector2(event.pageX, event.pageY);
            if (vp1) {
                corner1 = vector2(interoplate(vp1.x, event.pageX, cornerSize1), interoplate(vp1.y, event.pageY, cornerSize1));
                if (vp2) computedCorner1 = intersect(corner1.x, corner1.y, vp2.x, vp2.y, corner2.x, corner2.y, vp1.x, vp1.y);
                if (vp3) computedCorner3 = intersect(corner1.x, corner1.y, vp3.x, vp3.y, corner3.x, corner3.y, vp1.x, vp1.y);
            }
            if (vp2) {
                corner2 = vector2(interoplate(vp2.x, event.pageX, cornerSize2), interoplate(vp2.y, event.pageY, cornerSize2));
                if (vp1) computedCorner1 = intersect(corner1.x, corner1.y, vp2.x, vp2.y, corner2.x, corner2.y, vp1.x, vp1.y);
                if (vp3) computedCorner2 = intersect(corner2.x, corner2.y, vp3.x, vp3.y, corner3.x, corner3.y, vp2.x, vp2.y);
            }
            if (vp3) {
                corner3 = vector2(interoplate(vp3.x, event.pageX, cornerSize3), interoplate(vp3.y, event.pageY, cornerSize3));
                if (vp1) computedCorner3 = intersect(corner1.x, corner1.y, vp3.x, vp3.y, corner3.x, corner3.y, vp1.x, vp1.y);
                if (vp2) computedCorner2 = intersect(corner2.x, corner2.y, vp3.x, vp3.y, corner3.x, corner3.y, vp2.x, vp2.y);
            }
            break;
        case 1:
            vp1 = vector2(event.pageX, event.pageY);
            corner1 = vector2(interoplate(event.pageX, origin.x, cornerSize1), interoplate(event.pageY, origin.y, cornerSize1));
            if (vp2) computedCorner1 = intersect(corner1.x, corner1.y, vp2.x, vp2.y, corner2.x, corner2.y, vp1.x, vp1.y);
            if (vp3) computedCorner3 = intersect(corner1.x, corner1.y, vp3.x, vp3.y, corner3.x, corner3.y, vp1.x, vp1.y);
            break;
        case 2:
            vp2 = vector2(event.pageX, event.pageY);
            corner2 = vector2(interoplate(event.pageX, origin.x, cornerSize2), interoplate(event.pageY, origin.y, cornerSize2));
            if (vp1) computedCorner1 = intersect(corner2.x, corner2.y, vp1.x, vp1.y, corner1.x, corner1.y, vp2.x, vp2.y);
            if (vp3) computedCorner2 = intersect(corner2.x, corner2.y, vp3.x, vp3.y, corner3.x, corner3.y, vp2.x, vp2.y);
            break;
        case 3:
            vp3 = vector2(event.pageX, event.pageY);
            corner3 = vector2(interoplate(event.pageX, origin.x, cornerSize3), interoplate(event.pageY, origin.y, cornerSize3));
            if (vp1) computedCorner3 = intersect(corner3.x, corner3.y, vp1.x, vp1.y, corner1.x, corner1.y, vp3.x, vp3.y);
            if (vp2) computedCorner2 = intersect(corner2.x, corner2.y, vp3.x, vp3.y, corner3.x, corner3.y, vp2.x, vp2.y);
            placing = -1;
            break;
    }

    if (computedCorner1 && computedCorner2 && computedCorner3) {
        backCorner = intersect(computedCorner1.x, computedCorner1.y, vp3.x, vp3.y, computedCorner2.x, computedCorner2.y, vp1.x, vp1.y);
    }

    placing++;
});

canvas.addEventListener('mousemove', (event) => {
    draw(event);
});

canvas.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
        if (placing == 1) cornerSize1 = Math.max(cornerSize1 - 0.025, 0.025);
        else if (placing == 2) cornerSize2 = Math.max(cornerSize2 - 0.025, 0.025);
        else if (placing == 3) cornerSize3 = Math.max(cornerSize3 - 0.025, 0.025);
        else {
            cornerSize1 = Math.max(cornerSize1 - 0.025, 0.025);
            cornerSize2 = Math.max(cornerSize2 - 0.025, 0.025);
            cornerSize3 = Math.max(cornerSize3 - 0.025, 0.025);
        }
    } else {
        if (placing == 1) cornerSize1 = Math.min(cornerSize1 + 0.025, 0.975);
        else if (placing == 2) cornerSize2 = Math.min(cornerSize2 + 0.025, 0.975);
        else if (placing == 3) cornerSize3 = Math.min(cornerSize3 + 0.025, 0.975);
        else {
            cornerSize1 = Math.min(cornerSize1 + 0.025, 0.975);
            cornerSize2 = Math.min(cornerSize2 + 0.025, 0.975);
            cornerSize3 = Math.min(cornerSize3 + 0.025, 0.975);
        }
    }

    draw(event);
});

window.addEventListener('keypress', (event) => {
    if (event.key == "1" || event.key == "x")
        placing = 1;
    else if (event.key == "2" || event.key == "y")
        placing = 2;
    else if (event.key == "3" || event.key == "z")
        placing = 3;
    else if (event.key == "0" || event.key == "o")
        placing = 0;
});
