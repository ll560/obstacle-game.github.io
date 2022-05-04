console.log("game")

let gameItem;

function startPlaying() {
    gameArea.start();
    //game piece has the falling parameters
    gameItem = new component(30, 30, "blue", 10, 120);
}

  
    function component(width, height, color, x, y){
        this.width = width;
        this.height = height;
        
        this.x = x;
        this.y = y;
        ctx= gameArea.context;
        ctx.fillStyle =color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    } 


let gameArea ={
    canvas: document.createElement("canvas"),
        start : function(){
            this.canvas.width = 700;
            this.canvas.height = 870;
            this.context = this.canvas.getContext("2d")

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        }
}