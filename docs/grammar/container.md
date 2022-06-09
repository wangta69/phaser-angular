# Container

아래 프로그램은 이미지와 text를 결합하는 예제이다.
이미지와 텍스트를 결합한 후 group에 추가하고 클릭이벤트를 생성한다.

```
preload() {
    this.load.spritesheet('piecesSprite', 'Image Path', {frameWidth: 100, frameHeight: 100 });
}

create() {
    const piecesGroup = this.add.group(); // pieceGroup 이라는 그룹을 생성한다.
    let piece;
    let piecesIndex = 0;
    for (...) {
        const sprite = this.add.sprite(0, 0, 'piecesSprite', piecesIndex).setOrigin(0);
        const label = this.add.text(0, 0, piecesIndex.toString(), { fontSize: '10em' }).setOrigin(0);
        const container: any = this.add.container(x, y, [sprite,label]);

        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.pieceWidth, this.pieceHeight), Phaser.Geom.Rectangle.Contains);
        container.on('clicked', this.selectPiece, this);
        piecesIndex ++;
    }

    this.input.on('gameobjectup',  (pointer: any, gameObject: any) =>
        {
            gameObject.emit('clicked', gameObject);
        }, this);
}
```