var ExpandingArray = function () {
    this.store = [[null]];
    this.rowOffset = 0;
    this.colOffset = 0;
}

// public API

ExpandingArray.prototype.put = function (row, col, item) {
    var numRows = this.store.length;
    var numCols = this.store[0].length;
    var relRow = row + this.rowOffset;
    var relCol = col + this.colOffset;


    if (relRow >= numRows) {
        this._addRows(relRow - numRows + 1);
    }
    if (relCol >= numCols) {
        this._addCols(relCol - numCols + 1);
    }
    if (relRow < 0) {
        this._addRows(-relRow);
        this._shiftRows(-relRow);
        this.rowOffset += -relRow;
    }
    if (relCol < 0) {
        this._addCols(-relCol);
        this._shiftCols(-relCol);
        this.colOffset += -relCol;
    }


    relRow = row + this.rowOffset;
    relCol = col + this.colOffset;

    this.store[relRow][relCol] = item;
}

ExpandingArray.prototype.get = function (row, col) {
    if (!this._inBounds(row, col)) {
        return null;
    }
    return this.store[row+this.rowOffset][col+this.colOffset];
}

// Expand the array up to this point to avoid cascading expansions
// expansions can involve shifting elements, so you can prep the array
// so that you only need one expansion
ExpandingArray.prototype.prep = function (row, col) {
    // put null, but check if theres stuff there already
    if (!this._inBounds(row, col)) {
        this.put(row, col, null);
    }
}


// helpers

ExpandingArray.prototype._inBounds = function (row, col) {
    var numRows = this.store.length;
    var numCols = this.store[0].length;
    var relRow = row + this.rowOffset;
    var relCol = col + this.colOffset;
    return (relRow >=0 && relCol >=0 &&
            relRow < numRows && relCol < numCols);
}

ExpandingArray.prototype._addRows = function(num) {
    var numCols = this.store[0].length;
    for (var i=0; i<num; i++){
        var newRow = []
        for (var j=0; j<numCols; j++){
            newRow.push(null);
        }
        this.store.push(newRow);
    }
}

ExpandingArray.prototype._addCols = function(num) {
    var numRows = this.store.length;
    for (var i=0; i<numRows; i++){
        for (var j=0; j<num; j++){
            this.store[i].push(null);
        }
    }
}

ExpandingArray.prototype._shiftRows = function (num) {
    var numCols = this.store[0].length;
    for (var i=this.store.length-1; i>=0; i--) {
        if (i>=num) {
            this.store[i] = this.store[i-num];
        } else {
            var newRow = []
            for (var j=0; j<numCols; j++){
                newRow.push(null);
            }
            this.store[i] = newRow;
        }
    }
}

ExpandingArray.prototype._shiftCols = function (num) {
    var numCols = this.store[0].length;
    for (var i=0; i<this.store.length; i++) {
        for (var j=numCols-1; j>=0; j--) {
            if (j>=num) {
                this.store[i][j] = this.store[i][j-num];
            } else {
                this.store[i][j] = null;
            }
        }
    }
}

ExpandingArray.prototype.print = function () {
    var output = "";
    for (var i=0; i<this.store.length; i++) {
        if (i == this.rowOffset) {
            output += "\n"
        }
        var line = "";
        for (var j=0; j<this.store[0].length; j++) {
            if (j == this.colOffset) {
                line += "  ";
            }


            var item = this.store[i][j];
            if (item === null) {
                item = "."
            }

            line += item+" ";

        }
        output += line+"\n"
    }
    console.log(output)
}