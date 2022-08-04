# Graphics

참조 : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/graphics/

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
g.beginPath();
g.moveTo(x1, y1);
g.lineTo(x2, y2);
g.lineTo(x3, y3);
g.strokePath();
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

g.fillStyle(color, alpha);
g.fillStyle(0xFF00FF);

g.fillGradientStyle(topLeft, topRight, bottomLeft, bottomRight, alpha);
g.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);

g.lineStyle(lineWidth, color, alpha);   // color: 0xRRGGBB
g.lineGradientStyle(barrelWidth, 0, 0, 0, 0)


```

다음에 보기 이미지로 채우기
//