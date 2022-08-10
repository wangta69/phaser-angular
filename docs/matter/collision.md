# collision

category, mask;

category 는 collision의 속성을 정의하는 곳이고
mask는 어느 collision을 통과(충돌안시킴) 시킬 것인가를 체크하는 것이다.

카테고리는 최대 32 까지 존재하며 아래와 같다.
0x0001 0x0002 0x0004 0x0008 0x0010

collision Filter를 별도로 정의하지 않으면 1번이 된다.

```
const defaultCategory = 0x0001, // for walls
const redCategory = 0x0002, // red circles
const yellowCategory = 0x0004 // yellow circles
```

red ball
```
Bodies.circle(x, y, 20, {
  collisionFilter: {
    category: redCategory,
  },
  render: {
    strokeStyle: 'red'
    fillStyle: 'transparent',
    lineWidth: 1,
  },
})
```
yellow ball
```
Bodies.circle(x, y, 20, {
  collisionFilter: {
    category: yellowCategory,
  },
  render: {
    strokeStyle: 'yellow',
    fillStyle: 'transparent',
    lineWidth: 1,
  },
})
```
blue ball
```
Bodies.circle(310, 40, 30, {
  collisionFilter: {
    mask: defaultCategory | yellowCategory,
  },
  render: {
    fillStyle: 'blue',
  },
})
```
블루볼은 redCategory가 mask에 없으므로 redCategory와는 충돌하지 않는다.
