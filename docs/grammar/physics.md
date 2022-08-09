# physics

```
private config = {
    .....
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    .....
}
```
## default
사용할 물리엔진 js 를 의미한다.
arcade
matter

## 충돌테스트
```
this.physics.add.collider([GameObject1], [GameObject2]);
```

## matter 사용예
```
private config = {
    .....
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            debugBodyColor: 0x000000
        }
    },
    .....
}
```
```
public create() {
    this.matter.add.rectangle(center.x, center.y, distance, 10, {
        isStatic: true,
        angle: angle
    })

    this.matter.add.polygon(Phaser.Math.Between(0, this.canvas.width), -50, Phaser.Math.Between(3, 10), Phaser.Math.Between(10, 40));
}
```