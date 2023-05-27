class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
      this.load.audio('sfx_jump', './assets/audio/jump.wav');
      this.load.audio('sfx_select', './assets/audio/blipSelect.wav');
     
    }
    create() {
      game.settings = {
        xianjing_p: 0.5,
        speed:2
      }
      this.scene.start('playScene');
      keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
      keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    }
    update() {

    }

}