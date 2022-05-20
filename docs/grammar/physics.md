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

## 충돌테스트
```
this.physics.add.collider([GameObject1], [GameObject2]);
```