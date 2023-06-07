class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  

      scene.add.existing(this);
      this.isJump = false;
      this.jump = 3;
      this.playerjump = 0;
      this.v = 0;
      this.a = 2;
      this.oy = y;
      this.jumphight = 4;
      this.sfxjump = scene.sound.add('sfx_jump');
    }

    update() {
        this.y += this.v;
        console.log(this.y);
        if(!this.isJump){
            if(Phaser.Input.Keyboard.JustDown(keyJUMP)) {
                this.isJump = true;
                this.v -= this.jumphight;
                this.playerjump += 1;
                this.sfxjump.play();
            }
        }else if(this.playerjump < this.jump && Phaser.Input.Keyboard.JustDown(keyJUMP) && this.v >= -this.a){
            this.v -= this.jumphight;
            this.playerjump += 1;
            this.sfxjump.play();
        }
        if(this.y > this.oy && this.isJump){
            this.v = 0;
            this.playerjump = 0;
            this.isJump = false;
            this.y = this.oy;

        }
        if(this.isJump){
            this.v += 0.1;
        }

    }
    
}