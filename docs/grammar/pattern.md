# pattern
```
const pattern = this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0, 0);;
const pieceShape = this.make.graphics({}, true).fillCircle(150, 150, 100);
pattern.setVisible(true);
pattern.setMask(pieceShape.createGeometryMask());
```