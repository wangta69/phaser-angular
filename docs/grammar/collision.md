# 충돌 테스트

this.add 대신 this.physics.add를 사용한다.
```
public create()  {
    this.cannonball = this.physics.add.sprite(100, 100,'cannonBall');
    this.pirateship = this.physics.add.sprite(300, 300, 'pirateShip');
}
```
## collider 사용시
```
this.physics.add.collider(this.cannonball, this.pirateship, (cannonball: any, pirateship: any) => {
});
```

## 한번만 처리하기
- 충돌이 한번 일어나더라고 타겟이 사라지지 않는 이상 계속적으로  callback이 발생한다.
이것을 방지하기위해 4번째 인자값을 추가하여 하용한다.

```
this.colliderActivated = true;
this.physics.add.collider(
    this.cannonball,
    this.pirateship,
    (cannonball: any, pirateship: any) => {console.log('hit test');this.colliderActivated = false;},
    ()=>{return this.colliderActivated}
    );
```

## overlap 사용시
```
override update()  {
    this.physics.add.overlap(this.cannonball, this.pirateship, (cannonball: any, pirateship: any) => { callback()});
}

private callback() {
    pirateship.disableBody(true, true);
}
```
collider 와 overlap 은 동일한 효과를 나타낸다.
단 차이점은 overlap은 두물체가 충돌하더라도 진행방향으로 그대로 진행하는 것에 반해 collider는 두개의 objec 가 충돌한 후 objec간의 특성에 따라 이동방향이 변경된다.