let config = {
    type: Phaser.CANVAS,
    render: {
      pixelArt: true
    },
    // width: 640,
    // height: 400,
    backgroundColor: '#33A5E7',
    physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
    },
    scale: {
      width: 640,
      height: 400,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Menu, Info, ChildMenu, Play, Level2, Level2_1, Level3, end1, 
             Level2_Info, Level3_Info, Level1_Info],
    zoom: 2,
  }
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyJUMP, keyQ, keyE, keyleft, keyright, keyup, keydown;
let key_w, key_a, key_s, key_d, key_n;






  