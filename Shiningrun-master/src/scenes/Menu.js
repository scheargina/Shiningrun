class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      this.load.audio('sfx_jump', './assets/audio/jump.wav');
      this.load.audio('sfx_select', './assets/audio/blipSelect.wav');
     
     
    }
    create() {
      // this.add.text(0, 0, 'Hello World', { font: '"Press Start 2P"' });
      this.add.text(260, 100, 'Shiningrun');

      const information = this.add.text(310, 150, 'information');
      information.setInteractive();
      information.setOriginFromFrame();
      information.on('pointerup', () => {
        this.scene.start('infoScene');
      })

      const play = this.add.text(280, 200, 'Play');
      play.setInteractive();
      play.setOriginFromFrame();
      play.on('pointerup', () => {
        this.scene.start('childMenuScene');
      })

      
    }
    update() {

    }

}