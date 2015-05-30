var AppController = function () {
    this.x = 300;
    this.y = 300;
    this.ratFilmPlayer = new Filmplayer();
    this.ratFilmPlayer.addFilmStrip("running", Content.getFilm('images/rat.png'));
    this.ratFilmPlayer.addFilmStrip("spazzing", Content.getFilm('images/Spazout.png'));
    this.carrotBmp = Content.getImage('images/carrot.png');

    this.board = new Board(GameTile);
    this.board.getTileAt(new Cube(2,0,-2)).color = '#FF0000';

    // var a = new ExpandingArray();
    // a.put(5,3, 8 )
    // a.put(10,5, 8 )
    // a.print()
    // a.put(5,10, 8)
    // a.put(-5, -3,  7)
    // a.put(-2,15, 9)
    // a.put(2,-8, 4)
    // a.print()
    // console.log(a.get(-5,-3) == 7)
    // console.log(a.get(5,10) == 8)
    // console.log(a.get(-2,15) == 9)
    // console.log(a.get(2,-8) == 4)
}

AppController.prototype.update = function () {
    if(Key.isDown(Key.LEFT)){
        this.x -= 3;
    }
    if(Key.isDown(Key.RIGHT)){
        this.x += 3;
    }
    if(Key.isDown(Key.UP)){
        this.y -= 3;
    }
    if(Key.isDown(Key.DOWN)){
        this.y += 3;
    }


    if(Key.isDown(32)){
        this.ratFilmPlayer.swapFilm("spazzing");
    }else{
        this.ratFilmPlayer.swapFilm("running");
    }

    this.ratFilmPlayer.updateFrame();
}

AppController.prototype.draw = function () {
    // Draw the background
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,WIDTH,HEIGHT);

    // draw
    context.fillStyle = "#FFFFFF";
    context.fillRect(0,0,WIDTH,HEIGHT);
    this.ratFilmPlayer.draw(this.x,this.y);

    //this demonstrates the two ways to draw bitmaps,
    //   * using one that was returned from loadImage
    //   * fetching one from Content's cache
    context.drawImage(this.carrotBmp, 20, 20);

    this.board.draw(context, 200,200, 20);
}