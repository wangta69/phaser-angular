#Loader
## Image
```
this.load.image('key', 'image');
```
```
this.add.image(0, 0, 'key').setOrigin(0, 0)
```
## SpriteSheet
```
his.load.spritesheet({
    key: 'bot',
    url: 'images/robot.png',
    frameConfig: {
        frameWidth: 32,
        frameHeight: 38,
        startFrame: 0,
        endFrame: 8
    }
});
```
```
this.load.spritesheet(
    'key',
    'image',
    {   
        frameWidth: width,
        frameHeight: height
    }
);
```
```
this.physics.add.sprite(50, 250, 'ball'); // x, y, texture
```
## Sound
```
this.load.audio('effect-sound', 'assets/sounds/sound-file')
```