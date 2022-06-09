# sprite

sprtie를 frame의 크기로 나눈다.
```
preload() {
    this.load.spritesheet('piecesSprite', '[image path]', {frameWidth: this.pieceWidth, frameHeight: this.pieceHeight});
}
```
x, y 의 포지션에다가 piecesSprite 의 piecesIndex 을 올려둔다.
```
const sprite = this.add.sprite(x, y, 'piecesSprite', piecesIndex);
```