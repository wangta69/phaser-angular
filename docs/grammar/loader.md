#Loader
## Image
```
this.load.image('key', 'image path');
```
```
this.add.image(0, 0, 'key').setOrigin(0, 0)
```
### 이미지 변경
```
this.tank = this.add.image(0, 0, 'keyFrom')
this.tank.setTexture('keyTo')
```
## svg
```
this.load.svg('key', 'image path');
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
    this.cache.json.remove('gameData'); // 캐시삭제하기
    this.load.json('gameData', '/assets/data/1.json');
}

private create ()
{
    const gameData = this.cache.json.get('gameData');
}
```

## 모든 캐시 삭제
```
for(let type in this.cache) {
    if (type != 'game') {
        for (let entry in this.cache[type]) {
            this.cache[type].remove(entry);
        }
    }
}
```

