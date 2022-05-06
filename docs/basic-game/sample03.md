# Create FlatForm
## display an Image

```
public create ()
{
    this.add.image(400, 300, 'sky');
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
}
```
this.physics : Arcade Physics system을 사용할 것이라고 정의함
이경우 config 에 physics를 추가해 주어야 한다.

Arcade Physics 은 두가지 유형의 body가 존재한다. (Dynamic and Static)
- dynamic body: 중력이나 가속도와 같은 힘에 의해 움직여진다.
bouncd 되거나 다른 물체와 충돌할 수도 있다.
- static: 말그대로 화면에 고정되어지는 것이다.

두가지 Physics를 group으로 묶는 이유는 비슷한 물체나 작동등을 하나의 unit으로 만들기 위해서 이다.
그룹을 만든 후는 'create'를 사용하여 loading된 이미지등을 그룹에 포함시킬 수 있다.
```
private config = {
    ....
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
    ....
}
```
this.physics 을 호출하여 element에 물리적 특성을 넣어둔다.
이때 주의점은 config에 physics property를 추가하여야 한다.

```
this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```
실제 ground의 이미지 크기는 400x32 이다. 화면이 800 이므로 setScale을 이용하여 2배 크기로 만들었다.
