// http://www.redblobgames.com/grids/hexagons/

// Base class for a tile of a board
// Tiles contain their cube position, although they 
// are stored in axial position in the array
//
// This class can be overwritten to change the draw method etc.
// Just make sure that when you call the board constructor, you are
// putting in the new tile class as the argument

var Tile = function (cubePos) {
    this.cubePos = cubePos.copy();
    this.color = '#0099DD';
}

// absolute position on screen to draw hex with radius
Tile.prototype.drawRawHex = function(ctx, x, y, radius) {
    var i, angle, tempX, tempY;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (i=0; i<=6; i++) {
        angle = Math.PI/3 * i;
        tempX = radius * Math.cos(angle) + x;
        tempY = radius * Math.sin(angle) + y;
        if (i == 0) {
            ctx.moveTo(tempX, tempY);
        } else {
            ctx.lineTo(tempX, tempY);
        }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

// x and y are offsets of the original board,
// hex position will be (x + xPixelPos, y + yPixelPos)
Tile.prototype.draw = function(ctx, x, y, radius) {
    // you should override this method with a subclass method
    var tx = radius * 3/2 * this.cubePos.x;
    var ty = radius * Math.sqrt(3) * (this.cubePos.z + this.cubePos.x/2);

    // apply offset x,y and draw at position
    this.drawRawHex(ctx, tx + x, ty + y, radius); 
}

// Cube coordinate system point
var Cube = function(x,y,z) {
    if(x + y + z != 0) alert("Cube inv broken");
    this.x = x;
    this.y = y;
    this.z = z;
}

//addition functions alter object, not return new object
Cube.prototype.add = function(x,y,z) {
    this.x += x;
    this.y += y;
    this.z += z;
}

Cube.prototype.addV = function(cube) {
    this.x += cube.x;
    this.y += cube.y;
    this.z += cube.z;
}

Cube.prototype.round = function() {
    var rx = Math.round(this.x);
    var ry = Math.round(this.y);
    var rz = Math.round(this.z);

    var xDiff = Math.abs(rx - this.x);
    var yDiff = Math.abs(ry - this.y);
    var zDiff = Math.abs(rz - this.z);

    if (xDiff > yDiff && xDiff > zDiff) {
        rx = -ry-rz;
    } else if (yDiff > zDiff) {
        ry = -rx-rz;
    } else {
        rz = -rx-ry;
    }

    this.x = rx;
    this.y = ry;
    this.z = rz;
}

Cube.prototype.copy = function() {
    return new Cube(this.x, this.y, this.z);
}

var CubeDirs = [
    new Cube(1,-1,0),
    new Cube(1,0,-1),
    new Cube(0,1,-1),
    new Cube(-1,1,0),
    new Cube(-1,0,1),
    new Cube(0,-1,1)
    ]

// Axial coordinate system point
var Axial = function(q,r) {
    this.q = q;
    this.r = r;
}

Axial.prototype.add = function(q,r) {
    this.q += q;
    this.r += r;
}

Axial.prototype.addV = function(axial) {
    this.q += axial.q;
    this.r += axial.r;
}

Axial.prototype.round = function () {
    var c = axial2Cube(this);
    c.round();
    var a = cube2Axial(c);
    this.q = a.q;
    this.r = a.r;
}

Axial.prototype.copy = function() {
    return new Axial(this.q, this.r);
}

var cube2Axial = function(cube) {
    return new Axial(cube.x, cube.z);
}

var axial2Cube = function(axial) {
    var y = -axial.q - axial.r;
    return new Cube(axial.q, y, axial.r);
}