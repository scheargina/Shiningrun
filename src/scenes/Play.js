class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
      this.load.image('zhangai3', './assets/scene1/zhangai3.png');
      this.load.image('zhangai4', './assets/scene1/zhangai5.png');
      this.load.image('beizhua1', './assets/scene1/beizhua1.png');
      this.load.image('beizhua2', './assets/scene1/beizhua2.png');
      this.load.image('bg1', './assets/scene1/scene01.png');
      this.load.image('bg2', './assets/scene1/scenefinal.png');
      this.load.audio('sfx_bgm', './assets/audio/bgm/Come-Play-with-Me.mp3');

      this.load.spritesheet('car', './assets/scene1/1.png', {frameWidth: 96, frameHeight: 96, startFrame: 0, endFrame: 1});
      this.load.spritesheet('girl', './assets/scene1/2xiaonihai.png', {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 3});
    }
    
    create() {
      this.bg1 = this.add.tileSprite(0, 0, 640, 400, 'bg1').setOrigin(0, 0);
      this.bg2 = this.add.tileSprite(0, 0, 640, 400, 'bg2').setOrigin(0, 0);
      this.bg2.visible = false;
      this.playstart = false;
      this.car = new Car(this, game.config.width*0, game.config.height - 64*2, 'car').setOrigin(0,0);
      this.girl = new xianjing(this, game.config.width*0, game.config.height - 64*2.5, 'girl').setOrigin(0,0);
      this.girl.visible = false;
      this.xianjing01 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai3').setOrigin(0,0);
      this.xianjing02 = new xianjing(this, game.config.width, game.config.height - 64*1.5, 'zhangai4').setOrigin(0,0);
      
      this.sfxbgm = this.sound.add('sfx_bgm');
      this.sfxbgm.play();
      this.sfxbgm.volume = 0.1;
      this.sfxbgm.loop = true;

      this.anims.create({
        key: 'car',
        frames: this.anims.generateFrameNumbers('car', { start: 0, end: 1, first: 0}),
        frameRate: 5,
        repeat:-1
      });
      this.anims.create({
        key: 'girl',
        frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3, first: 0}),
        frameRate: 5,
        repeat:-1
      });

      this.car.anims.play('car');
      this.girl.anims.play('girl');
      this.speed = game.settings.speed;

      keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      
      let Config = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
      }
      
      this.gameOver = false;
    }
    update() {
      if(this.gameOver){
        this.car.x += this.speed;
        this.car.update();
        if(this.car.x >= game.config.width - 100){
          this.scene.start('end1'); // go to next scene(scene2 inf)
        }
      }
      if (!this.gameOver && !this.playstart) {
        this.car.x += this.speed;
        if(this.car.x >= game.config.width/2 - 96*1){
          this.playstart = true;
          this.girl.visible = true;
        }   
      }

      if (!this.gameOver && this.playstart) {               
        this.car.update();
        this.bg1.tilePositionX += this.speed;
        this.xianjing01.update(); 
        this.xianjing02.update();

        if((this.xianjing01.end - this.xianjing02.end)<= 200 && (this.xianjing01.end - this.xianjing02.end) >= 0 ){
          this.xianjing01.reset();
        } 
        if(this.time.now >=  this.xianjing01.end && !this.xianjing01.move ){
          this.xianjing01.move = true;
        }

        if((this.xianjing02.end - this.xianjing01.end)<= 200 && (this.xianjing02.end - this.xianjing01.end) >= 0 ){
          this.xianjing02.reset();
        }
        if(this.time.now >= this.xianjing02.end && !this.xianjing02.move ){
          this.xianjing02.move = true;
        }
        

        if(this.time.now - this.time.startTime >=10000 && game.settings.speed == this.xianjing01.moveSpeed){
          this.xianjing01.moveSpeed += 1;
          this.xianjing02.moveSpeed += 1;
          this.speed += 1;
        }
        if(this.time.now - this.time.startTime >=20000){
          this.bg1.visible = false;
          this.bg2.visible = true;
          this.bg2.tilePositionX += this.speed;
          if(this.bg2.tilePositionX >= 260){
            this.gameOver = true;
          }

        }

        if(this.checkCollision(this.car,this.xianjing01) ||
        this.checkCollision(this.car,this.xianjing02)){
          this.car.x -= this.speed //comment this to WUSHUANG!
        }

        if(this.checkCollision(this.car,this.girl)){
          this.gameOver = true;
          this.sfxbgm.stop();
          this.scene.start('end1');
        }
      }  
    }


    checkCollision(maomao, zhangai) {
      
      if (maomao.x < zhangai.x + zhangai.width -8 && 
        maomao.x + maomao.width > zhangai.x + 8 && 
        maomao.y < zhangai.y + zhangai.height &&
        maomao.height + maomao.y > zhangai.y + 16) {
        return true;
      } else {
        return false;
      }
    }
  }