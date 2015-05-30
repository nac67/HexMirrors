// http://www.redblobgames.com/grids/hexagons/

// This board contains many hexagon tiles. The argument in the 
// constructor is the class used for the tiles, and it should
// inherit from the tile base class.
// Tiles are processed using cube coordinates, but are stored
// in an array with axial coordinates.
var Board = function (TileClass) {
    this.map = Board.generateHexagonBoard(TileClass, 5);
    this.x = 200; //x pixel location of (0,0,0)
    this.y = 200; //y pixel location of (0,0,0)
    this.hexRad = 20; //size in pixels of radius of hex (or side length)
}

Board.prototype.getNeighborAt = function(tile, dir) {
    var result = tile.cubePos.copy();
    result.addV(CubeDirs[dir]);
    return this.getTileAt(result);
}

Board.prototype.getTileAt = function(cubePos) {
    var q = cubePos.x;
    var r = cubePos.z;
    return this.map.get(q,r);
}

// given a pixel position, get the tile (or null) at
// that position. Takes into account boards offset
// and hexSize
Board.prototype.getTileAtXY = function(mx, my) {
    var x = mx - this.x;
    var y = my - this.y;
    var q = x * 2/3 / this.hexRad;
    var r = (-x / 3 + Math.sqrt(3)/3 * y) / this.hexRad;
    var axial = new Axial(q,r);
    axial.round();
    return this.getTileAt(axial2Cube(axial));
}

Board.prototype.draw = function (ctx) {
    var i,j,elem;
    for (i=0; i<this.map.store.length; i++) {
        for (j=0; j<this.map.store[0].length; j++) {
            elem = this.map.store[i][j];
            if (elem !== null) {                
                elem.draw(ctx, this.x, this.y, this.hexRad);
            }
        }
    }
}




Board.generateHexagonBoard = function (TileClass, radius) {
    var i,j,k;

    // create the 2d array
    var storage = new ExpandingArray();

    // for efficiency, prepare size
    storage.prep(-radius, -radius); //upper left most point
    storage.prep(radius, radius); //lower right most point

    for (i=-radius; i<=radius; i++) {
        for (j=-radius; j<=radius; j++) {
            for (k=-radius; k<=radius; k++) {
                if (i+j+k == 0) {
                    var cubePos = new Cube(i,j,k);
                    var axialPos = cube2Axial(cubePos);
                    storage.put(
                        axialPos.q,
                        axialPos.r, 
                        new TileClass(cubePos));
                }
            }
        }
    }
    console.log(storage);
    return storage;
}