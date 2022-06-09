# Group
그룹은 일종의 레이어를 만들고 그 위에 다양한 object를 올리는 것이다.
이렇게 그룹으로 올려주면 group 자체에 속성을 변경함으로서 각각의 objec를 변경할 수 있다.

```
preload() {
    this.load.spritesheet('piecesSprite', 'Image Path', {frameWidth: 100, frameHeight: 100 });
}

create() {
    const piecesGroup = this.add.group(); // pieceGroup 이라는 그룹을 생성한다.
    let piece;
    let piecesIndex = 0;
    for (...) {
        piece = this.piecesGroup.create(x, y, 'piecesSprite', piecesIndex);
        piecesIndex ++;
    }
}
```
https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html#create
create( [x] [, y] [, key] [, frame] [, visible] [, active])
piecesGroup.create() 는 pieceGroup 상에 sprite 이미지를 올린다.

참조로
https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html#add
```
this.piecesGroup.add(child [, addToScene])
```