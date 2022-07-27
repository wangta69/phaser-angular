# 다각형 그리기

## 사각형 그리기
```
x: 시작점(좌상)
y: 시작점(좌상)

this.add.rectangle(x, y, w, h, color, alpha)
const rect = this.add.rectangle(x, y, w, h, 0x9966ff).setOrigin(0, 0)
rect.setStrokeStyle(4, 0xefc53f); // 테두리 그리기

```

### 타원
```
var circle = new Phaser.Geom.Circle(x, y, radius);
```

## 삼각형 그리기
```
각각의 3 꼭지점
const triangle = new Phaser.Geom.Triangle(x1, y1, x2, y2, x3, y3);
```
```
x: 시작점(좌상)
y: 시작점(좌상)
this.add.triangle(x, y, x1, y1, x2, y2, x3, y3, 0x6666ff);
this.add.triangle(200, 200, 0, 148, 148, 148, 74, 0, 0x6666ff);
```
## 폴리곤
삼각형 그리기와 동일 각각의 점을 나열하면 된다.
```
var polygon = new Phaser.Geom.Polygon(points);
```