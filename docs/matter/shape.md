# Shape

## rectangle
```
this.diamond = this.matter.add.rectangle(posX, posY - 40, 30, 30, {
    friction: 1,
    restitution: 0,
    label: 'diamond'
});
```
```
this.matter.add.rectangle(0, 700, 1000, 10, {
    isStatic: true,
    angle: 0,
    friction: 1,
    restitution: 0,
    collisionFilter: {
        category: 2
    },
    label: 'ground'
});
```
## circle
```
this.frontWheel = this.matter.add.circle(posX, posY, 30, {
    friction: 1,
    restitution: 0,
    collisionFilter: {
        mask: 2
    },
    label: 'wheel'
});
```



## image
```
this.frontWheel = this.matter.add.image(posX, posY, 'wheel', undefined, {
    friction: 1,
    restitution: 0,
    collisionFilter: {
        mask: 2
    },
    label: 'wheel'
});
```

타원일우 등은 아래와 같이 type을 설정하고 각각의 type에 대한 모양을 setBody를 이용해 설정할 수 있다.
```
this.wheel = this.matter.add.image(50, 0, 'wheel');
this.wheel.setBody({
    type: 'circle',
    radius: this.wheel.width / 2
}, {
    label: 'wheelFront',
    // collisionFilter: {
    //   group: group
    // },
    // friction,
    // density
});

this.wheel.setBounce(0.9)
```


## compound object
```
const floor = (Phaser.Physics.Matter as any).Matter.Bodies.rectangle(posX, posY, 100, 10, {
    label: 'car'
});

const rightBarrier = (Phaser.Physics.Matter as any).Matter.Bodies.rectangle(posX + 45, posY - 15, 10, 20, {
    label: 'car'
});
const leftBarrier = (Phaser.Physics.Matter as any).Matter.Bodies.rectangle(posX - 45, posY - 15, 10, 20, {
    label: 'car'
});

// this is how we create the compound object
this.body = (Phaser.Physics.Matter as any).Matter.Body.create({

    // array of single bodies
    parts: [floor, leftBarrier, rightBarrier],
    friction: 1,
    restitution: 0
});

// add the body to the world
this.matter.world.add(this.body);

```
###  style
```
setBodyRenderStyle(body, [lineColor], [lineOpacity], [lineThickness], [fillColor], [fillOpacity])
this.matter.world.setBodyRenderStyle(this.body, 0xff0000, 1, 5, 0x0000ff, 1)
```

