#Time

```
this.time.delayedCall(300, () => { // 300 utime
});
```

```
this.time.addEvent({
    delay: 500,
    callbackScope: this,
    callback: () => {
        this.createBox(Phaser.Math.Between(100, this.canvas.width - 100), -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true);
        this.tick ++;
        // if(this.tick == 100){
        //     this.scene.start("PlayGame");
        // }
    },
    loop: true
});
```