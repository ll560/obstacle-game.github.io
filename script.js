console.log("game")


const phaserConfig = {
    type: Phaser.AUTO,
    parent: "game",
    width: 1200,
    height: 720,
    backgroundColor: "#209e30",
    physics: {
      default: 'arcade',
      arcade: {
          //debug: true,
          gravity: { y: 300 }
      }
  },
    scene: {
        init: initScene,
        preload: preloadScene,
        create: createScene,
        update: updateScene
    },
    gameOver: false
};

const game = new Phaser.Game(phaserConfig);

//global variables
let cloudsWhite, cloudsWhiteSmall, platform;
let player, scoreText;
let cursors;
let diamonds, bombs;

let score = 0;
let resetText;

function initScene() { }

function preloadScene() {
    //place images in order back to front
    this.load.image('background','game-background.png')
    this.load.image("clouds-white", "clouds-white.png");
    this.load.image('platform','floating-platform.png')
    this.load.image('bomb', 'mine.png')
    this.load.image("clouds-white-small", "clouds-white-small.png");
    this.load.image('diamond', 'diamond.png');
    this.load.image('cell', 'red-blood-cell.png')
         //this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
         //this.load.spritesheet('balls', 'assets/blue_ball.png', { frameWidth: 17, frameHeight: 17 });
    this.load.spritesheet('dude','dude.png', {frameWidth:32, frameHeight: 48});
 }

 function createScene() {
   this.add.image(400, 300, 'background')
    // let bg = this.add.image(0, 0, 'cell')
    // let container = this.add.container(400, 300, [ bg ]);
    // bg.setInteractive();

    //     bg.once('pointerup', function () {

    //         this.scene.start('game');


    cloudsWhite = this.add.tileSprite(640, 200, 1280, 400, "clouds-white");//background
    
    //this is for platorm
    platform = this.physics.add.staticGroup();
    platform.enableBody = true;
    platform.create(340, 720, 'platform').setScale(.9).refreshBody();//bottom platform
    platform.create(900, 550, 'platform').setScale(.9);//ledge
    platform.create(70, 450, 'platform');
  
    
      

    //this is for our player
    player = this.physics.add.sprite(100, 450, 'dude');
    //player.body.velocity.setTo(200,200);
    player.body.bounce.set(.2);
    player.body.collideWorldBounds = true;
    //player.setScale(0.9, 0.9);

    //this is bounce colide player and platform
    this.physics.add.collider(player, platform);

  
   this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
        key: 'turn',
        frames:[{key: 'dude', frame: 4}],
        frameRate: 20
    })

    this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
      })
  
  cursors = this.input.keyboard.createCursorKeys();
    


  //this is for bombs -group
  // bomb is the name of item individual
    
    
    bombs = this.physics.add.group(
    
    );
    this.physics.add.collider(bombs, platform);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
 
    bombs.children.iterate(function (child) {
      child.setBounceY(1);//change this to 1
    });

    function hitBomb (player, bomb) {
      this.physics.pause();
       player.setTint(0xff1000);
       player.anims.play('turn');
       gameOver = true;


   }
  

    //this for the diamonds
    diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 8, //number of diamonds
      setXY:{x: 25, 
            y:0,  
            stepX: 125}
    });

    diamonds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    //check for collision on platform
    this.physics.add.collider(diamonds, platform);
    this.physics.add.overlap(player, diamonds, collectStar, null, this);
   
    resetText =this.add.text(1000, 680, 'reset game', {fontFamily: 'Arial', fontSize: 30, color: '#000' })
    // resetText.addEventListener('click', eventFunction);
    // function eventFunction(){
    //   console.log('new page')
    // }

    scoreText =this.add.text(15, 15, 'score: 0', {fontFamily: 'Arial', fontSize: 64, color: '#000' });
     // this.input.once(collectStar){

    function collectStar (player, diamond) {
        diamond.disableBody(true, true);

        score += 10;
        scoreText.setText('Score:' + score)

       if(diamonds.countActive(true) === 0) { //if the count of active stars = 0
         diamonds.children.iterate(function(child) {
           child.enableBody(true, child.x, 0, true, true);//reactivates the star
         });

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
            //this.group
         let bomb1 = bombs.create(x, 16, 'bomb');
         bomb1.setBounce(1);
         bomb1.setCollideWorldBounds(true);
         bomb1.setVelocity(Phaser.Math.Between(-200, 200), 20);

      } 
      
 }




    
  //}
  
  //group.createMultiple({ key: 'diamonds', frame: [0,1,2,3,4], repeat: 4, max: 12 });
  //Phaser.Actions.SetXY(group.getChildren(), 35, 100, 32);
  //}
    //ground.scale.setTo(2, 2)
    //ground.body.immovable = true

    //cloudsWhiteSmall = this.add.tileSprite(640, 200, 1280, 400, "clouds-white-small");
    //icon= this.add.sprite(32, this.height - 150, 'icon');
    //adding the character
  
    

    
    //cursors = game.input.keyboard.createCursorKeys()

    
 }


 function updateScene() {
    cloudsWhite.tilePositionX += 0.5;
    //cloudsWhiteSmall.tilePositionX += 0.25;

if (cursors.left.isDown)
{
    player.setVelocityX(-160);
    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);
    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);
    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
if (score === 20){
   alert("You Win!")
   score = 0
   setTimeout(window.location.href = "index.html", 6000); //setTimeout to slow it down
  }



}





    // this.newPos = function(){
    //     this.x += this.speedX;
    //     this.y += this.speedY;

    //     }
//     }


//     function updateGameArea() {
//         gameArea.clear();
//         gameItem.newPos();
//         gameItem.update();
//       }
      
      // function moveup() {
      //   icon.speedY -= 1;
      // }
      
      // function movedown() {
      //   icon.speedY += 1;
      // }
      
//       function moveleft() {
//         gameItem.speedX -= 1;
//       }
      
//       function moveright() {
//         gameItem.speedX += 1;
//       }
      






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


//=================items wrilling around
const PORT = process.env.PORT || 3000;