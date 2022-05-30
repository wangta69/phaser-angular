# 기본구조
# 기본 구조

```
export class MyScene extends Phaser.Scene {
    private game: any;
    private config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    constructor() {
        this.game = new Phaser.Game(this.config);
    }

    public preload()  {
    }

    public create()  {
    }

    override update()  {
    }
}
```
coinfig.scene 에 정의된 함수되로 차례로 실행된다.

그러나 위의 방식은 angular에서는 문제점이 발생한다. preload나 create 등의 안에서 this를 호출하면 MyScene 이 아니라 Phaser.Scene가 this가 된다. 따라서 angular에서는 아래의 방법(Scene manager)으로 수정하는 것이 옳은 것 같다. 또한 이 방법이 추후 복잡한 게임으로 전개시 확장성이 더 있다.
game.scene.add 에 세번째 인자값을 true로 추가하면 scene 에 추가시 바로 preload, create, update가 실행된다.

```
export class BasicGameComponent1 {
    // public game: any;

    private config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600
    }


    constructor() {
        const game = new Phaser.Game(this.config);
        game.scene.add('main', new MyScene(), true);
    }
}

export class MyScene extends Phaser.Scene {
    constructor() {
        super({});
    }

    private preload ()
    {

    }

    private create ()
    {
    }

    override update ()
    {
    }
}
```

### config 에 scene이 정의되지 않음 경우
```
private config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600
}


constructor() {
    const game = new Phaser.Game(this.config);
    game.scene.add('main', new MyScene(), true);
}
```

### config 에 scene를 정의하는 경우
```
private config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        MyScene
    ]
}


constructor() {
    const game = new Phaser.Game(this.config);
}
```
### config 에 scene 이 여러개 정의된 경우
```
private config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
        MyScene1,
        MyScene2
    ]
}


constructor() {
    const game = new Phaser.Game(this.config);
}
```
위와 같은 겨우 MyScene1 이 자동로드되고 이후 프로그램에서
this.scene.start('game', { level: 1 }) 처럼 다음 scene의 key를 호출하여야 한다.