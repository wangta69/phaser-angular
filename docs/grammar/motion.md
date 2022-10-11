# Motion move
특정방향으로 진행한다.
```
private create () {
    const speed = 5000; // milisecond
    this.physics.moveTo(object, target.x,  target.y, speed, [1000]);
}
```

```
private create () {
    const speed = 5000; // milisecond
    this.physics.moveToObject(object, {x, y}, speed, [1000]);
}
```
위의 코드는 한방향으로 계속진행하므로 멈추게 하기위해서는  reset 명령을 사용하여야 한다.
```
function update ()
{
    var distance = Phaser.Math.Distance.Between(source.x, source.y, target.x, target.y);

    if (source.body.speed > 0)
    {
        distanceText.setText('Distance: ' + distance);

        //  4 is our distance tolerance, i.e. how close the source can get to the target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.
        if (distance < 4)
        {
            source.body.reset(target.x, target.y);
        }
    }
}
```


