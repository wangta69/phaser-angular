# addgroup
```
function preload() {
    this.load.image('baddie', 'assets/sprites/space-baddie.png');
}
```
```
function create() {
    enemies = game.add.group();

    for (var i = 0; i < 16; i++)
    {
        //  This creates a new Phaser.Sprite instance within the group
        //  It will be randomly placed within the world and use the 'baddie' image to display
        enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'baddie');
    }
}
```
https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html
```
create( [x] [, y] [, key] [, frame] [, visible] [, active])
```
일반적으로는 x( x postion), y(y position) 그리고 로드된 이미지의 key로서 가능하다.
그러나 spritesheet 를 이용하여 특정이미지를 넣을 경우 frame 옵션을 추가하면 유용하다.

```
// preload()
game.load.image('baddie', 'assets/sprites/space-baddie.png');
this.load.spritesheet('baddie', 'assets/sprites/space-baddie.png', {frameWidth: 100, frameHeight: 100});

// create
this.myGroup = this.add.group();
for (i..)
    for (j...)
        this.myGroup.create(j * 100, i * 100, 'baddie', specific frame number);

```

