console.log("game")


const phaserConfig = {
    type: Phaser.AUTO,
    parent: "game",
    width: 1280,
    height: 720,
    backgroundColor: "#5DACD8",
    physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: { y: 200 }
      }
  },
    scene: {
        init: initScene,
        preload: preloadScene,
        create: createScene,
        update: updateScene
    }
};



// //background images
 const game = new Phaser.Game(phaserConfig);

var cloudsWhite, cloudsWhiteSmall, platform;
let diamonds;
let icon;

function initScene() { }

function preloadScene() {
    //place images in order back to front
    this.load.image("clouds-white", "clouds-white.png");
    this.load.image('platform','platform.png')
    this.load.image('bomb', 'mine.png')
    //this.load.image("clouds-white-small", "clouds-white-small.png");
    this.load.image('star', 'diamond.png');
    //this.load.image('diamonds', 'red-blood-cell.png')
    this.load.spritesheet('dude','icon.png', {frameWidth:44, frameHeight: 38});
    
 }

 function createScene() {
    
    cloudsWhite = this.add.tileSprite(640, 200, 1280, 400, "clouds-white");

    platform = this.physics.add.staticGroup()
    platform.enableBody = true;
    platform.create(330, 750, 'platform').setScale(.9).refreshBody();//bottom platform

    platform.create(860, 500, 'platform') //ledge
    platform.create(50, 300, 'platform')
  
    //this is for our player
    player= this.physics.add.sprite(icon, false)
    icon.body.velocity.setTo(200,200);
    icon.body.collideWorldBounds = true;
    icon.body.bounce.set(1);
    icon.setScale(0.9, 0.9);

    //this for the diamonds
    diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 11,
      setXY:{x: 12, y:0, stepX: 70}
    });

    diamonds.children.iterate(function (child){
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(diamonds, platforms);

  

  group = this.add.group();//demo fromphaser page
  for (let i =0; i <12; i++){
  let diamond= group.create(i*70, 0, 'diamonds')
  diamond.createMultiple({ key: 'diamonds', frame: [0,1,2,3,4], frameQuantity: 2, repeat: 1 });
  //group.createMultiple({ key: 'diamonds', frame: [0,1,2,3,4], repeat: 4, max: 12 });
  Phaser.Actions.SetXY(group.getChildren(), 35, 100, 32);
  }
    //ground.scale.setTo(2, 2)
    //ground.body.immovable = true

    //cloudsWhiteSmall = this.add.tileSprite(640, 200, 1280, 400, "clouds-white-small");
    //icon= this.add.sprite(32, this.height - 150, 'icon');
    //adding the character

    //icon=this.add.sprite(102, 550 , 'icon', 'icon.png');
    //this is the icon scale
  


    
    
    
    
    
    for (let i = 0; i <12; i++){
      //dia.create( i * 70 , 0, 'diamond')
      dia.body.gravity.y = 1000
      dia.body.bounce.y = 0.3 + Math.random() * 0.2
    }


    scoreText = game.add.text(16, 16, '', {fontSize: '32px', fill: '#000'})
    cursors = game.input.keyboard.createCursorKeys()
    
 }
 function updateScene() {
//     cloudsWhite.tilePositionX += 0.5;
//     cloudsWhiteSmall.tilePositionX += 0.25;
}









//function startPlaying() {
      //phaserConfig.start();
//     //game piece has the falling parameters
//     gameItem = new component(30, 30, "blue", 10, 120);
//}

  
//     function component(width, height, color, x, y){
//         this.width = width;
//         this.height = height;
//         this.speedX =0;//used to change position
//         this.speedY =0;//used to change position
//         this.x = x;
//         this.y = y;
//         this.update = function(){
//         //ctx= gameArea.context;
//         //ctx.fillStyle =color;
//         //ctx.fillRect(this.x, this.y, this.width, this.height);
//     } 

    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;

        }
//     }


//     function updateGameArea() {
//         gameArea.clear();
//         gameItem.newPos();
//         gameItem.update();
//       }
      
      function moveup() {
        icon.speedY -= 1;
      }
      
      function movedown() {
        icon.speedY += 1;
      }
      
//       function moveleft() {
//         gameItem.speedX -= 1;
//       }
      
//       function moveright() {
//         gameItem.speedX += 1;
//       }
      


// let gameArea ={
//     canvas: document.createElement("canvas"),
//         start : function(){
//             this.canvas.width = 700;
//             this.canvas.height = 700;
//             this.context = this.canvas.getContext("2d")

//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//         },
//         clear : function() {
//             this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         }

// }




//------------working sprite
// var config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     parent: 'phaser-example',
//     scene: {
//         preload: preload,
//         create: create
//     }
// };

// var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.spritesheet('explosion', 'assets/guy.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
//     this.load.spritesheet('balls', 'assets/guy.png', { frameWidth: 17, frameHeight: 17 });
// }

// function create ()
// {
//     var config = {
//         key: 'explodeAnimation',
//         frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
//         frameRate: 20,
//         repeat: -1
//     };

//     this.anims.create(config);

//     this.add.sprite(400, 300, 'explosion').play('explodeAnimation');

//     this.add.sprite(400, 300, 'balls', 3);
// }