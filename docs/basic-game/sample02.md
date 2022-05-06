# Preload

## Loading Assets
```
public preload ()
{
    this.load.crossOrigin = 'anonymous'; // option
    this.load.baseURL = 'assets/images/study1/'; // option baseURL을 설정할 경우 이후 경로에서는baseURL이 후 경로만 바로 사용가능하다.

    this.load.image('sky', 'sky.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'star.png');
    this.load.image('bomb', 'bomb.png');
    this.load.spritesheet('dude',
        'dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}


```

단일 이미지를 불러올경우 load.image를 사용, 첫번째 인자인 ball에 변수를 저장한다.
this.load.image('ball', 'img/ball.png');

spritesheet를 사용하여 width와 height로 이미지를 나누어 불러온다.
this.load.spritesheet(ExplosionEffect.SPRITE_KEY, ExplosionEffect.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

```
private create ()
{
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
}
```
로드된 이미지에 좌표값을 설정함으로서 화면에 디스플레이 된다.

여기서 생각해 볼문제점은 400, 300 이라는 좌표값이다.
config = {width: 800,height: 600} 를 기억해 보자. sky의 이미지 크기는 800x600 이고 center는 400x300 이다.
즉 이미지의 center를 화면의 중앙과 맞추는 것이다.
만약 center의 좌표값을 변경하려면
```
this.add.image(0, 0, 'sky').setOrigin(0, 0)
```
로 사용하면 된다. 이때는 0, 0을 기본점으로 하여 0,0 부터 디스플레이 한다는 뜻이다.

