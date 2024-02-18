const vector2 = (x = 0, y = 0) => { return { x, y } }
const mag = (x, y) => Math.sqrt(x * x + y * y);
const unit = (x1, y1, x2, y2) => {
    const magnitude = mag(x2 - x1, y2 - y1);
    return 
}

const interoplate = (a, b, y) => a + (b - a) * y;
const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

function drawLine(x1, y1, x2, y2, lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawCircle(x, y, radius = 4) {
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2, false);
    ctx.fill();
}

function drawVP(num, x, y) {
    drawLine(origin.x, origin.y, x, y);
    drawCircle(x, y);
}

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
        return false
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return {x, y}
}
