var Board = function () {
    
}


var generateHexagonBoard = function (radius) {
    var i,j,k;
    // figure out size of 2d array in axial coordinates
    // q will go in range [-radius,radius] and so will r,
    // in order to fit it into an array, the min is 0, so 
    // we must add radius to everything. now both are in range
    // [0, 2*radius]
    // we will throw this into a new class called StorageArray
    // which will offset things for convenience. This way our 
    // map can be centered on 0,0 and negative coordinates can
    // still be valid.

    // create the 2d array
    var storage = new StorageArray(radius*2, radius*2, 
                                   radius, radius);


    for (i=-radius; i<=radius; i++) {
        for (j=-radius; j<=radius; j++) {
            for (k=-radius; k<=radius; k++) {
                if (i+j+k == 0) {
                    console.log("whoopie!");
                }
            }
        }
    }

    // populate it with hex objects
    // inject neighbor methods into tile?
}




// create an xsize by ysize array (indexed[x][y]) which is
// offset. This allows negative positions to be valid inside
// the array so long as the invariant holds that [x+offsetX] >=0 etc
// storageArray[i][j] -> map[i+offsetX][j+offsetY]
var StorageArray = function (xsize, ysize, offsetX, offsetY) {
    this.map = [];
    for (i=0; i<=xsize*2; i++) {
        this.map.push([]);
        for (j=0; j<=ysize*2; j++) {
            this.map[i].push(null);
        }
    }

    this.offsetX = offsetX;
    this.offsetY = offsetY;
}