# Controlling the player with the keyboard

```
cursors = this.input.keyboard.createCursorKeys();
```
위와 같이 정의 함으로서 4곳의 방향(up, down, left, right)에 대한 키값을 얻을 수 있다

```
if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
```
left 키가 눌려진 상태이면 left방향으로 속도를 증가하고 일전에 정의한 player.anims.play에서 'left' 로 정의된 animation을 실행한다.

up 상태가 눌려지만 Y측 중력값을 - 로 설정하여 위로 올라가게 한다.
