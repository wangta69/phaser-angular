# addgroup
```
function preload() {
    game.load.image('baddie', 'assets/sprites/space-baddie.png');
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