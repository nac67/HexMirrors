var Board = function () {
    
}


var generateHexagonBoard = function (radius) {
    var i,j,k;

    // create the 2d array
    var storage = new ExpandingArray();


    for (i=-radius; i<=radius; i++) {
        for (j=-radius; j<=radius; j++) {
            for (k=-radius; k<=radius; k++) {
                if (i+j+k == 0) {
                    var cubePos = new Cube(i,j,k);
                    var axialPos = cube2Axial(cubePos);
                    storage.put(
                        axialPos.q,
                        axialPos.r, 
                        new Tile(cubePos));
                }
            }
        }
    }


    // populate it with hex objects
    // inject neighbor methods into tile?
}