var Board = function (TileClass) {
    this.map = Board.generateHexagonBoard(TileClass, 2);
}

Board.prototype.tileNeighbor = function(tile, dir) {
    var result = tile.cubePos.copy();
    result.addV(CubeDirs[dir]);
    return result;
}

Board.prototype.getTileAt = function(cubePos) {
    var q = cubePos.x;
    var r = cubePos.z;
    return this.map.get(q,r);
}

//x,y means where to place (0,0,0) of board
Board.prototype.draw = function (ctx, x, y, hexRad) {
    var i,j,elem;
    for (i=0; i<this.map.store.length; i++) {
        for (j=0; j<this.map.store[0].length; j++) {
            elem = this.map.store[i][j];
            if (elem !== null) {                
                elem.draw(ctx, x, y, hexRad);
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