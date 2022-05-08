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


//background images
const game = new Phaser.Game(phaserConfig);

//global variables
let cloudsWhite, cloudsWhiteSmall, platform;
let player, scoreText;
let cursors;
let diamonds, bombs;

let score = 0;


function initScene() { }

function preloadScene() {
    //place images in order back to front
    this.load.image("clouds-white", "clouds-white.png");
    this.load.image('platform','floating-platform.png')
    this.load.image('bombs', 'mine.png')
    //this.load.image("clouds-white-small", "clouds-white-small.png");
    this.load.image('diamond', 'diamond.png');
    //this.load.image('diamonds', 'red-blood-cell.png')
         //this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });
         //this.load.spritesheet('balls', 'assets/blue_ball.png', { frameWidth: 17, frameHeight: 17 });
    this.load.spritesheet('dude','dude.png', {frameWidth:32, frameHeight: 48});
 }

 function createScene() {
   
    cloudsWhite = this.add.tileSprite(640, 200, 1280, 400, "clouds-white");//background
    
    //this is for platorm
    platform = this.physics.add.staticGroup();
    platform.enableBody = true;
    platform.create(350, 750, 'platform').setScale(.9).refreshBody();//bottom platform

    platform.create(890, 590, 'platform').setScale(.9);//ledge
    platform.create(70, 550, 'platform');
  
    
      
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
    
  

    //this for the diamonds
    diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 11, //number of diamonds
      setXY:{x: 25, 
            y:0,  
            stepX: 85}
    });

    diamonds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //check for collision on platform
    this.physics.add.collider(diamonds, platform);
    this.physics.add.overlap(player, diamonds, collectStar, null, this);
   
    
    
   //this is for bombs
    bombs = this.physics.add.group({
        key: 'bombs',
        repeat: 3,
        setXY:{
          x:25,
          y:0,
          stepX: 25
        }
    });
    this.physics.add.collider(bombs, platform);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
 
    function hitBomb (player, bombs){
      bombs.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver = true;

    }


    scoreText =this.add.text(15, 15, 'score: 0', {fontFamily: 'Arial', fontSize: 64, color: '#000' });
     // this.input.once(collectStar){
    function collectStar (player, diamonds) {
        diamonds.disableBody(true, true);

        score += 10;
        scoreText.setText('Score:' + score)

      //  if(this.bombs.countActive() === 0) //changed
      //  {
      //    this.diamonds.children.interate(function(child){
      //      child.enableBody(true, child.x, 0, true, true);
      //    });

      //    let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      //       //this.group
      //    let bomb = bombs.group.create(x, 16, 'bombs');
      //    bomb.setBounce(1);
      //    bomb.setCollideWorldBounds(true);
      //    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

      // } 
      
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
    //cloudsWhite.tilePositionX += 0.5;
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
//if (score === 120){
  //  alert("You Win!")
    //score = 0
  //}
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
