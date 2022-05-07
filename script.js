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
          gravity: { y: 300 }
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
let player;

function initScene() { }

function preloadScene() {
    //place images in order back to front
    this.load.image("clouds-white", "clouds-white.png");
    this.load.image('platform','platform.png')
    this.load.image('bomb', 'mine.png')
    //this.load.image("clouds-white-small", "clouds-white-small.png");
    this.load.image('diamond', 'diamond.png');
    //this.load.image('diamonds', 'red-blood-cell.png')
    this.load.spritesheet('dude','dude.png', {frameWidth:32, frameHeight: 48});
    
    
 }

 function createScene() {
    
    cloudsWhite = this.add.tileSprite(640, 200, 1280, 400, "clouds-white");

    


    platform = this.physics.add.staticGroup()
    platform.enableBody = true;
    platform.create(330, 750, 'platform').setScale(.9).refreshBody();//bottom platform

    platform.create(860, 500, 'platform') //ledge
    platform.create(50, 300, 'platform')
  
    
      
    //this is for our player
    
    
    player = this.physics.add.sprite(100, 450, 'dude')
    //player.body.velocity.setTo(200,200);
    player.body.collideWorldBounds = true;
    player.body.bounce.set(.2);
    //player.setScale(0.9, 0.9);
    
    // this.anims.create({
    // key:'left',
    // frames: this.anims.generateFrameNumbers('dude', {start:0, end: 3}),
    // frameRate: 10,
    // repeat: -1
    // })

    // this.anims.create({
    //   key: 'turn',
    //   frames:[ {key: 'dude', frame: 4}],
    //   frameRate: 20
    // })

    // this.anims.create({
    //   key:'right',
    //   frames: this.anims.generateFrameNumbers('dude', {start:5, end: 8}),
    //   frameRate: 10,
    //   repeat: -1
    //   })
    
    
    this.physics.add.collider(player, platform);
    //this.cursors = this.input.keyboard.createCursorKeys()
    

    //this for the diamonds
    diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 11,
      setXY:{x: 25, y:0, stepX: 85}
    });

    diamonds.children.iterate(function (child){
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //check for collision on platform
    this.physics.add.collider(diamonds, platform);
    this.physics.add.overlap(player, diamonds, collectStar, null, this);
    //diamonds.createMultiple({ key: 'diamonds', frame: [0,1,2,3,4], frameQuantity: 2, repeat: 1 });
    
    function collectStar (player, diamonds) {

        diamonds.disableBody(true, true);
    }

    player.anims.add('left', [0, 1, 2,], 10,true)
    player.anims.add('right', [6, 7, 8], 10,true)
  //group.createMultiple({ key: 'diamonds', frame: [0,1,2,3,4], repeat: 4, max: 12 });
  //Phaser.Actions.SetXY(group.getChildren(), 35, 100, 32);
  //}
    //ground.scale.setTo(2, 2)
    //ground.body.immovable = true

    //cloudsWhiteSmall = this.add.tileSprite(640, 200, 1280, 400, "clouds-white-small");
    //icon= this.add.sprite(32, this.height - 150, 'icon');
    //adding the character
  
    

    //scoreText = game.add.text(16, 16, '', {fontSize: '32px', fill: '#000'})
    //cursors = game.input.keyboard.createCursorKeys()
    
 }


cursors = this.input.keyboard.createCursorKeys();

 function updateScene() {
//     cloudsWhite.tilePositionX += 0.5;
//     cloudsWhiteSmall.tilePositionX += 0.25;

if (cursors.left.isDown)
    {
        player.body.velocity = -160;
    
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
      player.body.velocity = 160;
    
        player.anims.play('right', true);
    }
    else
    {
      player.body.velocity = 0;
    
        player.anims.play('turn');
    }
    
    if (cursors.up.isDown && player.body.touching.down)
    {
      player.body.velocity = -330;
    }


}











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