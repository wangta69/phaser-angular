import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class ParticleComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      type: Phaser.AUTO,
      width: 2000,
      height: 1000,
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
        // this.graphics = this.add.graphics();
        //  참조 : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/graphics/

        this.add.line(0,0,100,100,200,200,0xff0000);
        // ####################################

        const graphic1 = this.add.graphics();
        this.path = this.add.path(10, 10);
         // path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);
        this.path.lineTo(50, 100);
        this.path.lineTo(200, 150);

        //  cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
        this.path.cubicBezierTo(250, 200, 200, 100, 400, 100);
        this.path.closePath();
        this.path.draw(graphic1);
        // ####################################

        const graphics2 = this.add.graphics();
        graphics2.lineStyle(10, 0x0066F); // graphics.lineStyle(lineWidth, color, alpha);
        // graphics2.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);

        graphics2.beginPath();

        graphics2.moveTo(200, 50);
        graphics2.lineTo(100, 139);
        graphics2.lineTo(170, 215);
        graphics2.lineTo(325, 150);
        graphics2.lineTo(350, 90);
        graphics2.lineTo(300, 40);

        graphics2.closePath();
        graphics2.strokePath();
        // graphics2.fillPath();


        const clr = 0xffff00;
        const health = 90;
        const barrelWidth = 100;
        const graphics3 = this.add.graphics();
        const x = 500;
        const y = 500;
        const barrelOffset = {x: 550, y: 550};
        const barrelX =600;
        const barrelY = 600;


        graphics3.fillStyle(0xFF00FF);
        // // graphics3.lineStyle(5, 0xFF00FF, 1.0);
        graphics3.fillRect(x, y, (health / 100) * 24, 10);
        graphics3.strokeRect(x, y, 24, 10);
        // graphics3.fillStyle(clr);
        // // graphics3.strokeStyle(clr);
        // // graphics3.lineWidth = barrelWidth;
        // graphics3.lineGradientStyle(barrelWidth, 0, 0, 0, 0)
        // // graphics3.lineCap = 'butt';
        // graphics3.beginPath();
        // graphics3.moveTo(x + barrelOffset.x, y + barrelOffset.y);
        // // this.barrelX = x + Math.cos(angle) * barrelLength;
        // // this.barrelY = y - 8 - Math.sin(angle) * barrelLength;
        // graphics3.lineTo(barrelX, barrelY);
        // graphics3.stroke();

        /////////////////
        // const graphics4 = this.add.graphics();
        // graphics4.beginPath();
        // graphics4.closePath();
        // graphics4.fillPath(); // = graphics.fill()
        // graphics4.strokePath(); // = graphics.stroke()

        // 다음에 보기 이미지로 채우기
        //https://rexrainbow.github.io/phaser3-rex-notes/docs/site/graphics/
        const graphics4 = this.add.graphics();
        graphics4.lineStyle(23, 0x0066F, 0.26); // graphics.lineStyle(lineWidth, color, alpha);
        // graphics2.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);

        graphics4.beginPath();

        graphics4.moveTo(161.36722593426043, 678.2132032509064);
        graphics4.lineTo(161.0084585014725 , 679.1466302320736);
        graphics4.lineTo(160.41375549821657 , 678.5146897806061);
        graphics4.lineTo(161.36722593426043 , 678.2132032509064);
        graphics4.lineTo(161.0084585014725 , 679.1466302320736);
        graphics4.lineTo(76.51441219187474 , 758.0660169932921);

        graphics4.closePath();
        graphics4.strokePath();
    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        // this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path.draw(this.graphics);
    }



}

