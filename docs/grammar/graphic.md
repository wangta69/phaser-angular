# Graphics

참조 : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/graphics/


type: Phaser.CANVAS 에서는 일부(fillGradientStyle)가 작동하지 않을 수 있으므로
Phaser.AUTO 로 설정후 처리
## path vs line
```
line은  path에 의해 생성되고 path는 점들의 집합이다.
```

## 기본
```
const g = scene.add.graphics();
```
```
const g = scene.add.graphics({
    x: 0,
    y: 0,
    lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1
    },
    fillStyle: {
        color: 0xffffff,
        alpha: 1
    },
    add: true
});
```
```
g.setDefaultStyles({
    lineStyle: {
        width: 1,
        color: 0xffffff,
        alpha: 1
    },
    fillStyle: {
        color: 0xffffff,
        alpha: 1
    }
});
```
strokePath 를 사용하기 위해서는 lineStyle을 적용해 주어야 한다.
```
const g = this.add.graphics({lineStyle: {width: 2, color: 0xffffff}});
g.clear();
g.beginPath(); // ** 라인의 시작을 알림
g.moveTo(x1, y1);
g.lineTo(x2, y2);
g.lineTo(x3, y3);
g.strokePath(); // ** 라인 끝맺기
```
 를 사용하기위해서는 fillStyle을 정의해 주어야 한다.
```
const g = this.add.graphics();
g.clear();
g.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);
g.beginPath();
g.moveTo(x1, y1);
g.lineTo(x2, y2);
g.lineTo(x3, y3);
g.closePath();
g.();
```
## Path
```
const g = this.add.graphics();
g.beginPath();
g.closePath();
g.(); // = graphics.fill()
g.strokePath(); // = graphics.stroke()
```
```
const g = this.add.graphics();
this.path = this.add.path(10, 10);
this.path.lineTo(50, 100);
this.path.lineTo(200, 150);

//  cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
this.path.cubicBezierTo(250, 200, 200, 100, 400, 100);
this.path.closePath();
this.path.draw(g);
```

## Line
```
ctx.strokeStyle = color;
ctx.lineWidth = thick;
==>
g.lineStyle(thick, color, alpha);

g.strokeLineShape(line); // line: {x1, y1, x2, y2}
g.lineBetween(x1, y1, x2, y2);
g.lineTo(x, y);
g.moveTo(x, y);
```
## Lines
```
g.strokePoints(points, closeShape, closePath, endIndex);  // points: [{x, y}, ...]
g.fillPoints(points, closeShape, closePath, endIndex);  // points: [{x, y}, ...]
```
points : Array of {x, y}
closeShape : When true, the shape is closed by joining the last point to the first point.
closePath : When true, the path is closed before being stroked.
endIndex : The index of points to stop drawing at. Defaults to points.length.

## Rectangle
```
const g = this.add.graphics();
const {x, y, width, height} = {x: 100, y: 100, width: 100, height: 100};;
const rect =  new Phaser.Geom.Rectangle(x, y, width, height);
g.fillRectShape(rect); // rect: {x, y, width, height}
g.fillRect(x, y, width, height);
g.strokeRectShape(rect);  // rect: {x, y, width, height}
g.strokeRect(x, y, width, height);
```
```
g.fillStyle(0xFF00FF);
g.fillRect(x, y, 24, 10);
g.strokeRect(x, y, 24, 10);
```

## Rounded rectangle
```
g.fillRoundedRect(x, y, width, height, radius);
g.strokeRoundedRect(x, y, width, height, radius);
```
radius : number or an object {tl, tr, bl, br}

## 다양한 attribute 적용
```
g.fillStyle(color, alpha);
g.fillStyle(0xFF00FF);

g.fillGradientStyle(topLeft, topRight, bottomLeft, bottomRight, alpha);
g.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);

g.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
g.lineGradientStyle(barrelWidth, 0, 0, 0, 0)


```

## graphic to Texture
그래픽을 텍스쳐로 변경하는 방법입니다.
```
const g: any = this.make.graphics({x:0, y:0, add: false});
g.lineStyle(10, 0x0066F);
g.fillStyle(0xFF00FF, 1.0);
g.beginPath();

g.moveTo(0, 600);
g.lineTo(0, 400);
.......
g.closePath();
g.fillPath();
g.strokePath();
g.generateTexture('newKey', 800, 600); // key, width, height
g.destroy();
```
이후 생성된 키를 이용하여 다양하게 게임에 활용할 수 있습니다.

## mask
아래처럼 특정이미지로 채워진 shape를 구현할 수 있습니다.
```
const g: any = this.add.graphics();
const pattern = this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0, 0).setVisible(true)
g.fillCircle(150, 150, 100);
pattern.setMask(g.createGeometryMask());
```
```
const backgroundImage = this.add.image(0, 0, 'undersea').setOrigin(0, 0).setVisible(true);
const rectangleShape = g.fillRect(300, 300, 200, 200)
backgroundImage.setMask(rectangleShape.createGeometryMask());

```

## Input Event  
```
g = game.add.graphics(300, 200);

........................
// To Drawing Something;
........................

g.inputEnabled = true;
g.input.useHandCursor = true;

g.events.onInputDown.add(() => {});
g.events.onInputUp.add(() => {});
g.events.onInputOver.add(() => {});
g.events.onInputOut.add(() => {});

```
## 물리적인 effet 추가하기
sprite를 이용하여 바로 물리적엔진으로 변경
```
 this.bomb = this.physics.add.sprite(this.airplane.x, this.airplane.y, 'bomb');
```
물리적 그룹을 생성한후 추가
```
this.bomb = this.physics.add.group();
this.bomb.create(this.airplane.x, this.airplane.y, 'bomb').setScale(0.5).refreshBody()
```
스태딕그룹으로 생성한 후 추가
```
this.platforms = this.physics.add.staticGroup();
this.platforms.create(250, 520, 'ground').setScale(2, 0.5).refreshBody();
```
graphic 을 물리적 그룹에 추가
```
// const physicGraph = this.physics.add.staticGroup();
// const graphics = this.add.graphics();
// physicGraph.add(graphics);
```

```
this.physics.world.enable(graphics);
```
