class Level2_1 extends Phaser.Scene {
  constructor() {
    super("level2_1Scene");
    this.x = 0
    this.y = 285
    this.cnt = 0
    this.gs = []
    this.v = 1.5
    this.v_ = 1.5
    this.winner = null;
    this.gn = 4;
  }
  preload() {
    this.load.image('tile1', './assets/scene2/场景2终点幕/A4.png');
    this.load.image('tile2', './assets/scene2/场景2终点幕/Inside_C.png');
    this.load.image('tile3', './assets/scene2/场景2终点幕/A5.png');
    this.load.image('tile4', './assets/scene2/场景2终点幕/Inside_D.png');
    this.load.image('tile5', './assets/scene2/场景2终点幕/Inside_E.png');

    this.load.image('gap1', './assets/scene2/zhangai1.png');
    this.load.image('gap2', './assets/scene2/zhangai2.png');
    this.load.image('gap3', './assets/scene2/zhangai3.png');
    this.load.image('gap4', './assets/scene2/zhangai4.png');
    // this.load.tilemapTiledJSON('gamemap_2', './assets/scene2/场景2终点幕/changjing2.tmj');  
    this.load.tilemapTiledJSON('gamemap_2_1', './assets/scene2/场景2终点幕/zhongdian2.tmj');  

    this.load.spritesheet('johnny', './assets/scene3/Johnny.png', {frameWidth: 64, frameWidth: 64});
    this.load.spritesheet('johnny_wife', './assets/scene3/Johnny_wife.png', {frameWidth: 64, frameWidth: 64});
                                
    this.load.audio('bgm', './assets/audio/bgm/Horror-Long-Version.mp3');
    this.load.audio('h2', './assets/audio/场景2被抓语音包/heres-johnny_1.mp3');
    this.load.image('hp', './assets/audio/场景2被抓语音包/2_1.png');
    
  }
  create() {
    const map = this.add.tilemap('gamemap_2_1');
    const tileset1 =  map.addTilesetImage('1', 'tile1');
    const tileset2 = map.addTilesetImage('2', 'tile2');
    const tileset3 = map.addTilesetImage('地砖', 'tile3');
    const tileset4 = map.addTilesetImage('3', 'tile4');
    const tileset5 = map.addTilesetImage('4', 'tile5');
    this.layer1 = map.createLayer("1", [tileset1, tileset2, tileset3, tileset4, tileset5]);
    this.leyer2 = map.createLayer("2", [tileset1, tileset2, tileset3, tileset4, tileset5]);

    this.johnny = this.physics.add.sprite(-10, 285, 'johnny');
    this.johnny_wife = this.physics.add.sprite(100, 285, 'johnny_wife');
    this.anims.create({
      key: 'joh',
      frames: this.anims.generateFrameNumbers('johnny', {
        start: 0,
        end: 7
      }),
      frameRate: 16,
      repeat: -1
    });
    this.anims.create({
      key: 'wife',
      frames: this.anims.generateFrameNumbers('johnny_wife', {
        start: 0,
        end: 7
      }),
      frameRate: 16,
      repeat: -1
    });
    this.johnny.play('joh');
    this.johnny_wife.play('wife');
   
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.johnny_wife, true, 0.25, 0.25);
    this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

    keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    // layer1.setCollisionByProperty({ collides: true });
    // layer2.setCollisionByProperty({ collides: true });
    // this.physics.add.collider(this.johnny_wife, layer1);
    // this.physics.add.collider(this.johnny_wife, layer2);
    for (let i = 0; i < this.gn; i++) {
      this.gs.push(this.physics.add.image(Math.round(Math.random() * (1411 - 400 + 1) + 400), 305, 'gap' + (parseInt(Math.random() * 3) + 1)).setScale(0.8));
    }

    // this.p1 = this.physics.add.image(400, 285, 'gap3');
    this.v = 1.5
    this.johnny_wife.setCollideWorldBounds(true) 

    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    key_n = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    this.bgm = this.sound.add('bgm');
    this.bgm.play();
    this.bgm.volume = 0.3;
    this.bgm.loop = true;
  }
  update() {
    if (this.winner == null) {

      this.johnny.x += this.v_;
      this.johnny_wife.x += this.v;
      if (this.cnt <= 22) {
        if (keyJUMP.isDown) {
          this.johnny_wife.y -= 7;
          this.cnt += 1;
        } else {
          if (this.johnny_wife.y < this.y) {
            this.johnny_wife.y += 1
          } else {
            this.cnt = 0;
          }
        }
      } else {
        if (this.johnny_wife.y < this.y) {
          this.johnny_wife.y += 1
        } else {
          this.cnt = 0;
          
        }
      }
    let f = false;
    let t ;
    for (let i = 0; i < this.gn; i++) {
      t = this.gs[i];
      console.log(t.x, t.y,  t.y + t.body.width );
      if (this.johnny_wife.x > t.x - t.body.width && this.johnny_wife.x <= t.x 
        &&this.johnny_wife.y < t.y && this.johnny_wife.y > t.y - t.body.height ) {
          f = true;
          this.v = 0.0;
          break;
        }
        
      }
      if (!f && this.johnny_wife.y < t.y - t.body.height) {
        this.v = 1.5;
      }
      if (Math.abs(this.johnny_wife.x - this.johnny.x) < 5.5) {
        this.v = 0;
        this.v_ = 0;
        this.johnny.scale = 2;
        this.winner = 'johnny';
        this.add.text(this.johnny.x + 45, this.johnny.y - 130, 'johnny win!!!');
        this.add.text(this.johnny.x + 45, this.johnny.y - 100, 'Q: restart');
        this.add.text(this.johnny.x + 45, this.johnny.y - 70, 'E: menu'); 
        this.add.image(this.johnny.x - 125, this.johnny.y - 130, 'hp').setScale(0.5);
        this.bgm.stop();
        this.h2 = this.sound.add('h2');
        this.h2.play();
        this.h2.volume = 0.3;
      }
      
      if (this.johnny_wife.x >= 1373) {
        this.v = 0;
        this.v_ = 0;
        this.winner = 'johnny wifi';
        this.johnny_wife.scale = 2;
        this.add.text(this.johnny_wife.x - 155, this.johnny_wife.y - 130, 'johnny wife win!!!');
        this.add.text(this.johnny_wife.x - 155, this.johnny_wife.y - 100, 'Q: restart');
        this.add.text(this.johnny_wife.x - 155, this.johnny_wife.y - 70, 'E: menu'); 
      }
      
    } else {
      if (keyQ.isDown) {
        this.winner = null;
        this.gs = [];
        this.v = 1.5
        this.v_ = 1.5
        this.cnt = 0
        this.bgm.stop();
        this.scene.start('level2Scene');
      }
      if (keyE.isDown) {
        this.winner = null;
        this.gs = [];
        this.v = 1.5
        this.v_ = 1.5
        this.cnt = 0
        this.bgm.stop();
        this.scene.start('menuScene');
      }
      if (key_n.isDown && this.winner == 'johnny wifi') {
        this.winner = null;
        this.cnt = 0
        this.gs = [];
        this.v = 1.5
        this.v_ = 1.5
        this.bgm.stop();
      }
    }
     console.log(this.johnny_wife.x);
  }
}
