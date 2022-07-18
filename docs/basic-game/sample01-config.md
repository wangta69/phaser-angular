# Config
```
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    // 이후 추가 옵션
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'portals-td-container',
        width: 1920,
        height: 1080,
     },
     fps: {
        target: 60,
        min: 30,
        forceSetTimeOut: true
     },
     callbacks: {
        postBoot: function(game: any) { // 상기 width, height에 초기 설정 및 이미지를 설정후 아래처럼  스케일을 변경한다.
            game.canvas.style.width = '100%';
            game.canvas.style.height = '100%';
         }
     }
};
```
- type : Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO
Phaser.AUTO를 추천한다. AUTO를 사용하면 처음에는 WEBGL을 사용하려고 하지만 브라우즈나 디바이스 환경상 WEBGL을 사용할 수 없을 경우 자동으로 CANVAS로 전환 된다.
- width, height : 800x600의 canvas를 만든다. (이것은 resolution 크기이다.)
- physics 물리적 환경을 적용할때 사용한다.
- scene : 각각의 scene을 정의한다.
- scale
-- scale.parent: id를 지정함으로 그 id 안으로 canvas를 출력되게 한다.