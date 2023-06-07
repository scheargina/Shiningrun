class Level1_Info extends Phaser.Scene {
  constructor() {
    super("info1Scene");
  }
  preload() {
   
  }
  create() {
    // this.add.text(0, 0, 'Hello World', { font: '"Press Start 2P"' });
    // this.add.text(260, 100, 'Shiningrun');
    const information = this.add.text(100, 50, "First scene\n  One of the protagonists, Dani, met \nthe pair of sisters holding hands \nwhile riding a toy car in the hotel \nand hoped that he would play with \nthem. The atmosphere and \nsuspense of this scene are well done, \nand the horror factor is also in \nplace. When the player is caught, \nthe two little girls will ask the \nplayer to stay forever...\n  The empty space is the jump \nbutton, you can use it more than \nonce! The highest can achieve triple \njump!");

    const back = this.add.text(400, 300, 'start play');
    back.setInteractive();
    back.setOriginFromFrame();
    back.on('pointerup', () => {
      this.scene.start('playScene');
    })

    
  }
  update() {

  }

}