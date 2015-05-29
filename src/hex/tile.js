var Tile = function (cubePos) {
    this.cubePos = cubePos.copy();
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

Cube.prototype.copy = function() {
    return new Cube(this.x, this.y, this.z);
}

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