class Level3_Info extends Phaser.Scene {
  constructor() {
    super("info3Scene");
  }
  preload() {
   
  }
  create() {
    // this.add.text(0, 0, 'Hello World', { font: '"Press Start 2P"' });
    // this.add.text(260, 100, 'Shiningrun');
    const information = this.add.text(100, 50, "For the last scene:\n  The scene where Jack hunts down \nhis son Danny. They are in the \nblizzard maze at night. In the end, \nthe youngest son avoids leaving \nfootprints and successfully escapes \nJack's pursuit. This is also the end of \nthis article, so make this the last \npart of our game.\n  Use WASD to control the character \nto move and avoid hunting. After a \ncertain period of time, touch the \nmother who appears to end the \ngame.");

    const back = this.add.text(400, 300, 'start play');
    back.setInteractive();
    back.setOriginFromFrame();
    back.on('pointerup', () => {
      this.scene.start('level3Scene');
    })

    
  }
  update() {

  }

}