import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class SampleComponent2 implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
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
      // parent: null,
      callbacks: {
        // postBoot: function(game: any) {
        //   game.canvas.style.width = '100%';
        //   game.canvas.style.height = '100%';
        // }
      }
    }

    private game: any;

    constructor(
    ) { }

    ngOnInit() {
      this.game = new Phaser.Game(this.gameConfig);
      this.game.scene.add('main', new MyScene(), true);
    }

    ngAfterViewInit() {

    }
}

export class MyScene extends Phaser.Scene {
    private graphics: any;
    private path: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {

    }

    public create()  {
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObjectFactory.html#line__anchor
        // shows a red line
        this.graphics = this.add.graphics();


        this.add.line(0,0,100,100,200,200,0xff0000);
        // ####################################
        this.path = this.add.path(10, 10);
         // path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);

        this.path.lineTo(50, 100);

        this.path.lineTo(200, 150);

        //  cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
        this.path.cubicBezierTo(250, 200, 200, 100, 400, 100);
        this.path.closePath();
        // ####################################
        const graphics = this.add.graphics();

        graphics.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);

        graphics.beginPath();

        graphics.moveTo(400, 100);
        graphics.lineTo(200, 278);
        graphics.lineTo(340, 430);
        graphics.lineTo(650, 300);
        graphics.lineTo(700, 180);
        graphics.lineTo(600, 80);

        graphics.closePath();
        graphics.fillPath();

        // 다음에 보기 이미지로 채우기
        //https://rexrainbow.github.io/phaser3-rex-notes/docs/site/graphics/

    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.path.draw(this.graphics);
    }



}

