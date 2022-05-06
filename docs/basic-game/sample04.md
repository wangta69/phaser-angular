# Player
```
private create ()
{
    ..................
    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, this.bombs, (player: any, bomb: any)=>{
        this.hitBomb(player);
    });
}
```

```
this.player = this.physics.add.sprite(100, 450, 'dude');

this.player.setBounce(0.2);
this.player.setCollideWorldBounds(true);
```
bottom 으로 부터 100x450에 player를 둚
sprite가 physics를 상속받는다(this.physics.add)
bouce 0.2는  점핑후 땅에 내려울때 근소하게(0.2) 바운스가 발생한다.
setCollideWorldBounds(true) : world와 충돌이 설정되었다.

anims.create 는 sprite 이미지를 3단계(left, turn, right)로 분리하고 각각의 애니메이션을 설정한다.
https://phaser.io/tutorials/making-your-first-phaser-3-game/part5 참조

repeat: -1 : 연속적으로 움직임을 뜻함.
frameRate: 10 : 초당 10프레임을 움직임


player에 중력값을 300 준다.(중력값이 클 수록 빨리 떨어진다.)
```
player.body.setGravityY(300)
```
player와 platforms에 충돌을 추가한다.
platforms 에는 ground가 그룹으로 들어가 있는 것을 기억하자.
```
this.physics.add.collider(player, platforms);
```
