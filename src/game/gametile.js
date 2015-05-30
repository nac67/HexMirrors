var GameTile = function (cubePos) {
    Tile.call(this, cubePos);
}
GameTile.prototype = Object.create(Tile.prototype);

// GameTile.prototype.draw = function () {
    
// }