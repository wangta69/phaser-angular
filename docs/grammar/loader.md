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
이미지 캐시를 삭제하기
```
this.textures.remove('key');
```
```
this.physics.add.sprite(50, 250, 'ball'); // x, y, texture
```
## Sound
```
private preload ()
{
    this.load.audio('mysound', 'assets/sounds/sound-file')
}

const mySound = this.sound.add('mysound');
mySound.play({loop: true, volume: 0.9})

```

## JSON
```
private preload ()
{
    this.load.json('gameData', '/assets/data/1.json');
}

private create ()
{
    const gameData = this.cache.json.get('gameData');
}
```

