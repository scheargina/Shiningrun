class end1 extends Phaser.Scene {
    constructor() {
      super("end1");
    }
    preload() {
      this.load.audio('sfx_end1', './assets/audio/scene1badending/forever.mp3');
      this.load.image('2girl', './assets/scene1/beizhua1.png');
      this.load.image('3girl', './assets/scene1/beizhua1.1.png');
      this.load.image('2girlsmile', './assets/scene1/beizhua2.png');
    }
    create() {
      this.sfxend1 = this.sound.add('sfx_end1');
      this.sfxend1.play();
      this.sfxend1.volume = 0.5;
      

      this.girl1 = this.add.image(game.config.width*0.5 - 64, game.config.height * 0.5 - 64, '2girl').setOrigin(0,0);
      this.girl2 = this.add.image(game.config.width*0.5 - 192 , game.config.height * 0.5 - 192, '3girl').setOrigin(0,0);
      this.girl3 = this.add.image(game.config.width*0.5 - 256, game.config.height * 0.5 - 256, '2girlsmile').setOrigin(0,0);
      //this.girl1.visible = false;
      this.girl2.visible = false;
      this.girl3.visible = false;

      this.starttime = this.time.now;
      this.interval = 5;

      let Config = {
        fontFamily: 'Courier',
        fontSize: '28px',
        color: '#ffffff',
        align: 'left',
        padding: {
          top: 5,
          bottom: 5,
        },
      }

      this.add.text(game.config.width*0, game.config.height*0, 'Q: Restart', Config).setOrigin(0,0);
      this.add.text(game.config.width*0, game.config.height*0 + 30, 'E: Menu', Config).setOrigin(0,0);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      

    }
    update() {
      if (Phaser.Input.Keyboard.JustDown(keyQ)) {
        this.sound.play('sfx_select');
        this.sfxend1.stop();
        this.scene.start("playScene");
      }
      if (Phaser.Input.Keyboard.JustDown(keyE)) {
        this.sound.play('sfx_select');
        this.sfxend1.stop();
        this.scene.start("menuScene");
      }
      if(this.time.now - this.starttime >= this.interval *1000 && this.girl1.visible){
        this.girl1.visible = false;
        this.girl2.visible = true;
      }
      if(this.time.now - this.starttime >= this.interval *1000*2 && this.girl2.visible){
        this.girl2.visible = false;
        this.girl3.visible = true;
      }
      if(this.time.now - this.starttime >= this.interval *1000*3 && this.girl3.visible){

      }

    }

}