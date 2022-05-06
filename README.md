# phaser-angular

 https://rottk.tistory.com/entry/Phaser3-%EC%9D%98-%EA%B8%B0%EB%B3%B8%EA%B8%B0%EB%8A%A5-%EB%B0%8F-%ED%8D%BC%EC%A6%90%EA%B2%8C%EC%9E%84-%EC%98%88%EC%8B%9C?category=812297



 angular13 + phaser 로 만든 A tower defense game
 https://github.com/stijn-jonckheere2/portals-td

 doc : https://newdocs.phaser.io/docs/

기본 구조 이해하기
 https://phaser.io/tutorials/making-your-first-phaser-3-game/part1

## 환경설정 및 세팅
```
npm i phaser
```

angular.json : scripts에 phaser.min.js 파일을 추가한다.
```
"scripts": ["node_modules/phaser/dist/phaser.min.js"]
```
tsconfig.json : lib에 scripthost를 추가한다.
```
"lib": [
  "es2020",
  "dom",
  "scripthost"
]
```

위의 scripthost를 추가함으로서 해결가능하다.
```
Compiled with problems:X
ERROR
node_modules/phaser/types/phaser.d.ts:9452:54 - error TS2304: Cannot find name 'ActiveXObject'.
9452         function ParseXML(data: string): DOMParser | ActiveXObject;
```

```
import * as Phaser from 'phaser';

export class SampleComponent1 {
    public readonly gameConfig = {
      version: "0.0.1",
      type: Phaser.AUTO,
      width: 480,
      height: 320,
      backgroundColor : '#71c5cf',
      physics: {
        default : 'arcade',
        arcade: {
          debug: true,
  		setBounds: false
        }
      },
    }

    private game: any;

    constructor(
    ) { }

    ngOnInit() {
      this.game = new Phaser.Game(this.gameConfig);
    }

```
[1-1. 기본구조](/docs/basic-game/sample01.md "기본구조 이해")
[1-2. Config](/docs/basic-game/sample01-config.md "Config 이해")
[2. Preload](/docs/basic-game/sample02.md "preload 이해")
[3.  Create &  World Building](/docs/basic-game/sample03.md "World Building")
[4. player](/docs/basic-game/sample04.md "Player")
[5. controller - keyboard](/docs/basic-game/sample05.md "controller")
[6. star](/docs/basic-game/sample06.md "star")
game = new Phaser.Game(config); 를 이용하여 phaser를 실행한다.
game.scene.add('KEY', new MyScene(), true);
sample0
option에 scene 이 있을 경우
const config = {
    scene: [
        MyScene,
        ....
   ],
....
}

portalsTDGame: Phaser.Game;
game = new Phaser.Game(config);
game.scene.start('KEY', {
    nextLevelKey: levelKey
});
KEY를 실행하고 KEY의 init 에 Object "{..}"를 전달

## 벽돌깨기 게임 만들기
### 장면(scene) 클래스
```
export class MyScene extends Phaser.Scene {
    private ball: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
    }

    public create()  {
    }

    override update()  {
    }
}
```

위의 preload, create, update 는 매우 중요한 파트이다.
preload : 이곳에서 이미지나 사운드, 폰트등 게임에서 사용할 assets을 모두 정의하여 읽어들인다.
create : 읽어들인 assets을 새로운 속성등을 부과하여 canvas에 올려둔다.
update : 속성이 부가된 assets을 동적 능력을 제공한다.

### Assets 불러오기
```
public preload()  {
    this.load.crossOrigin = 'anonymous';
    this.load.baseURL = '/';
    this.load.image('ball', 'img/ball.png');
}
```

### 화면에 출력하기
```
public create()  {
    this.ball = this.add.sprite(50, 50, 'KEY');
}
```
this.add.image(50, 50, 'KEY');
preload 에 정의 key값을 좌표값 50, 50 에 위치시킨다.

### 공 움직이기
```
override update()  {
    this.ball.x +=  1;
    this.ball.y +=  1;
}
```



