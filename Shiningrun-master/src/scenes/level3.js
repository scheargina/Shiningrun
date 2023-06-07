class Level3 extends Phaser.Scene {
  constructor() {
    super("level3Scene");
    this.VEL = 130;
    this.winner = null;
    this.wifi_out = false;
  }
  preload() {
    this.load.image('tiles', './assets/scene3/第三场的地图/taiga_ [resources].png');
    this.load.image('tiles1', './assets/scene3/第三场的地图/taiga_.png');
    this.load.tilemapTiledJSON('gamemap', './assets/scene3/第三场的地图/map3.tmj');    
    this.load.spritesheet('johnny', './assets/scene3/Johnny.png', {frameWidth: 64, frameWidth: 64});
    this.load.spritesheet('johnny_wife', './assets/scene3/Johnny_wife.png', {frameWidth: 64, frameWidth: 64});
    this.load.spritesheet('dani', './assets/scene3/Dani.png', {frameWidth: 32, frameWidth: 32});
    this.load.audio('bgm', './assets/audio/bgm/Horror-Long-Version.mp3');
  }
  create(data) {
    const map = this.add.tilemap('gamemap');
    const tileset1 = map.addTilesetImage("forest_ [resources]", "tiles");
    const tileset2 = map.addTilesetImage("forest_", "tiles1");
    const layer1 = map.createLayer("图块层 1", [tileset1, tileset2], 0, 0);
    const layer2 = map.createLayer("轮廓", [tileset1, tileset2], 0, 0);
    const layer3 = map.createLayer("物品", [tileset1, tileset2], 0, 0);


    this.johnny_ = this.physics.add.sprite( 50, 390, 'johnny');
    this.johnny_.scale = 0.5;
    this.dani_ = this.physics.add.sprite(80, 360, 'dani');

    // console.log(this.textures.get('johnny').getFrameNames());
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
      key: 'dan',
      frames: this.anims.generateFrameNumbers('dani', {
        start: 0,
        end: 7
      }),
      frameRate: 16,
      repeat: -1
    })
    this.johnny_.play('joh')
    this.dani_.play('dan');

    this.johnny_.body.setCollideWorldBounds(true)
    this.dani_.body.setCollideWorldBounds(true)

    layer1.setCollisionByProperty({ collides: true });
    layer2.setCollisionByProperty({ collides: true });
    layer3.setCollisionByProperty({ collides: true });

    // this.physics.add.collider(this.johnny_, layer1);
    this.physics.add.collider(this.johnny_, layer2);
    this.physics.add.collider(this.johnny_, layer3);
    // this.physics.add.collider(this.dani_, layer1);
    this.physics.add.collider(this.dani_, layer2);
    this.physics.add.collider(this.dani_, layer3);
    

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.dani_, true, 0.25, 0.25);
    this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);


    key_a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    key_d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key_w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.time.addEvent({
      delay: 20 * 1000,
      callback: () => {
        this.johnny_wife = this.physics.add.sprite( 90, 410, 'johnny_wife', 0);
        this.johnny_wife.scale = 1;
        this.wifi_out = true;
      },
      repeat: 1
    });

    this.bgm = this.sound.add('bgm');
    this.bgm.play();
    this.bgm.volume = 0.3;
    this.bgm.loop = true;

  }
  update() {
      
      if (this.winner == null) {
        this.direction = new Phaser.Math.Vector2(0);
        this.direction1 = new Phaser.Math.Vector2(0);
          if (key_a.isDown) {
              this.direction.x = -1
          } else if (key_d.isDown) {
              this.direction.x = 1
          } else if (key_s.isDown) {
              this.direction.y = 1
          } else if (key_w.isDown) {
              this.direction.y = -1
          } 
          this.direction.normalize()
          this.dani_.setVelocity(this.VEL * this.direction.x, this.VEL *this.direction.y);
    
          const x = Math.random();
          const y = Math.random();
          if (x > 0.25) {
            this.direction1.x = 1;
          } else {
            this.direction1.x = -1;
          }
          if (y > 0.55) {
            this.direction1.y = -1;
          } else {
            this.direction1.y = 1;
          }
          this.direction1.normalize()
          this.johnny_.setVelocity(this.VEL * this.direction1.x, this.VEL * this.direction1.y);
    
          const dis = Math.sqrt( Math.pow(Math.abs(this.johnny_.x - this.dani_.x), 2) + 
                                 Math.pow(Math.abs(this.johnny_.y - this.dani_.y), 2)  )
          if (dis < 15.0 && this.winner == null) {
            this.dani_.setVelocity(0,0);
            this.johnny_.setVelocity(0,0);
            if (this.winner == null) {
              this.winner = 'johnny'; 
              const win = this.add.sprite(this.johnny_.x, this.johnny_.y, 'johnny');
              win.scale = 2.0;
              this.add.text(this.johnny_.x - 25, this.johnny_.y - 100, 'johnny win!!!');
              this.add.text(this.johnny_.x - 25, this.johnny_.y - 60, 'Q: restart');
              this.add.text(this.johnny_.x - 25, this.johnny_.y - 30, 'E: menu'); 
            }
          }
          if (this.wifi_out) {
            const dis1 = Math.sqrt( Math.pow(Math.abs(this.johnny_wife.x - this.dani_.x), 2) + 
                                   Math.pow(Math.abs(this.johnny_wife.y - this.dani_.y), 2)  )
            if (dis1 < 15.0 && this.winner == null) {
              this.dani_.setVelocity(0,0);
              this.johnny_.setVelocity(0,0);
              if (this.winner == null) {
                this.winner = 'you'; 
                const win = this.add.sprite(this.johnny_wife.x, this.johnny_wife.y, 'dani');
                win.scale = 4.0;
                this.add.text(this.johnny_wife.x - 25, this.johnny_wife.y - 100, 'you win!!!');
                this.add.text(this.johnny_wife.x - 25, this.johnny_wife.y - 60, 'Q: restart');
                this.add.text(this.johnny_wife.x - 25, this.johnny_wife.y - 30, 'E: menu'); 
              }
            }
          }

      } else {
        
        if (keyQ.isDown) {
          this.winner = null;
          this.bgm.stop();
          this.wifi_out = false;
          this.scene.start('level3Scene');
        } else if (keyE.isDown) {
          this.winner = null;
          this.bgm.stop();
          this.wifi_out = false;
          this.scene.start('menuScene');
        } 
      }
        
  }
}
