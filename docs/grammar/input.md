

# Input
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/input/ 에서 input, touch, keyboard, gamepad, Mouse wheel 등 다양한 정보를 얻을 수 있다.

## KeyBoard
```
cursors = this.input.keyboard.createCursorKeys();
```
위와 같이 정의 함으로서 4곳의 방향(up, down, left, right)에 대한 키값을 얻을 수 있다

```
if (cursors.left.isDown)
{
}
else if (cursors.right.isDown)
{
}

if (cursors.up.isDown && player.body.touching.down)
{
}
```
전체 키를 받을 경우
```
this.input.keyboard.on('keydown', (k: any) => {
    const key = k.key.toUpperCase();
});
```
left 키가 눌려진 상태이면 left방향으로 속도를 증가하고 일전에 정의한 player.anims.play에서 'left' 로 정의된 animation을 실행한다.

up 상태가 눌려지만 Y측 중력값을 - 로 설정하여 위로 올라가게 한다.


## Mouse

```
mouse = this.input.mousePointer;
```
위와 같이 정의 함으로서 4곳의 방향(up, down, left, right)에 대한 키값을 얻을 수 있다

```
if (mouse.isDown) // 마우스가 다운상태인지 확인
{
    // Do action
}

```
```
this.input.x : // 마우스의 x좌표
this.input.y : // 마우스의 y좌표
```

```
public create()  {
    this.input.on('pointerdown', (pointer: any) => {
        this.physics.moveTo(this.cannonball, pointer.x, pointer.y, 500); //(gameObject, x, y, speed, maxTime)
    });
}
```
### this.input.on
```
pointerdown // On any touching start
pointerup  // On any touching end
```

### Is touching
```
var pointer = scene.input.activePointer;
if (pointer.isDown) {
    var touchX = pointer.x;
    var touchY = pointer.y;
    // ...
}
```

### on Touch game Object
```
gameObject.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    // ...
}, scope);

gameObject.setInteractive().on('pointerup', function(pointer, localX, localY, event){
    // ...
}, scope);
```

### drag game object
```

const ball1 = this.physics.add.sprite(200, 300,'cannonBall')
.setInteractive({ draggable: true })
.on('dragstart', (pointer: any, dragX: number, dragY: number) => {
    // ...The x coordinate where the Pointer is currently dragging the Game Object, in world space.
})
.on('drag', (pointer: any, dragX: number, dragY: number) => {            
    // The x coordinate where the Pointer is currently dragging the Game Object, in world space.
    ball1.setPosition(dragX, dragY);

})
.on('dragend', (pointer: any, dragX: number, dragY: number, dropped: boolean) => {
    // ...
});


gameObject
    .setInteractive({ draggable: true })
    .on('dragstart', function(pointer, dragX, dragY){
        // ...
    }, scope);
    .on('drag', function(pointer, dragX, dragY){
        gameObject.setPosition(dragX, dragY);
    }, scope);
    .on('dragend', function(pointer, dragX, dragY, dropped){
        // ...
    }, scope)


```

