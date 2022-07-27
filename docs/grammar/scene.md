# scene

```
ngOnInit() {
    this.game =new Phaser.Game(this.config);
}
```
특정 scene의 함수 / 변수 호출
```
this.game.scene.getScene('flood').resetGame();
this.game.scene.keys['main'].chStatus(status);

const correctAnswer =this.game.scene.keys['main'].correctAnswer;
```
scene 에서 다른 scene 을 호출
```
(this.scene.get('key') as any).function();

or
const preloader: any = this.scene.get('preloader');
```