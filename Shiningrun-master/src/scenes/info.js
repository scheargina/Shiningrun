class Info extends Phaser.Scene {
  constructor() {
    super("infoScene");
  }
  preload() {
   
  }
  create() {
    // this.add.text(0, 0, 'Hello World', { font: '"Press Start 2P"' });
    // this.add.text(260, 100, 'Shiningrun');
    const information = this.add.text(100, 50, 'The Shining" is a horror \nsuspense film produced by \nDouglas Twiddy. Adapted from \nthe novel of the same name \npublished by Stephen Edwin \nKing in 1977, the film tells \nthe story of the writer Jack \nTorrance, who took his wife and\nchildren to accept a winter janitorial\njob in a hotel in search of writing \ninspiration, but was driven crazy by\nvisions. story. The film was\nreleased in the United States \non May 23, 1980, and has grown \nin popularity as an addict. \nUltimately rated by many as one of the\ngreatest and most influential horror \nfilms ever made');

    const back = this.add.text(25, 10, 'back');
    back.setInteractive();
    back.setOriginFromFrame();
    back.on('pointerup', () => {
      this.scene.start('menuScene');
    })

    
  }
  update() {

  }

}