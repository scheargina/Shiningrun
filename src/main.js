let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 400,
    scene: [ Menu, Play, end1],
    bestpoint : 0
  }
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyJUMP, keyQ, keyE, keyleft, keyright, keyup, keydown;






  