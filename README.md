# phaser-angular

 https://rottk.tistory.com/entry/Phaser3-%EC%9D%98-%EA%B8%B0%EB%B3%B8%EA%B8%B0%EB%8A%A5-%EB%B0%8F-%ED%8D%BC%EC%A6%90%EA%B2%8C%EC%9E%84-%EC%98%88%EC%8B%9C?category=812297
 https://rottk.tistory.com/entry/Angular-%EC%99%80-Phaser-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0?category=812297

세팅방법
 https://braelynnn.medium.com/using-phaser-in-an-angular-8-component-53644a2280e3

 angular13 + phaser 로 만든 A tower defense game
 https://github.com/stijn-jonckheere2/portals-td

 doc : https://newdocs.phaser.io/docs/

## 환경설정
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
      title: "Phaser Running Test @ Angular",
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

### Assets 불러오기
```
public preload()  {
    this.load.crossOrigin = 'anonymous';
    this.load.baseURL = 'https://end3r.github.io/Gamedev-Phaser-Content-Kit/demos/';
    this.load.image('ball', 'img/ball.png');
}
```

### 화면에 출력하기
```
public create()  {
    this.ball = this.add.sprite(50, 50, 'ball');
}
```

### 공 움직이기
```
override update()  {
    this.ball.x +=  1;
    this.ball.y +=  1;
}
```



