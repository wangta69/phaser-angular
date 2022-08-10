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

        ///////////////////////////
        this.add.text(50, 20, 'add.Line Red color');
        this.add.line(0,0,100,100, 100, 200,0xff0000);


        const g = this.add.graphics();
        ///////////////////////////
        this.add.text(250, 50, 'add.path White color Fill yellow');

        g.lineStyle(2, 0xffffff, 1);
        this.path = this.add.path(300, 100); // 시작점
         // path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);
        this.path.lineTo(400, 100);
        this.path.lineTo(400, 200);
        //  cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
        this.path.cubicBezierTo(250, 200, 200, 100, 400, 100);
        this.path.closePath();
        // this.path.fillStyle(0xFF00FF);
        g.fillStyle(0xffff00);
        g.fillPoints(this.path.getPoints()); //
        this.path.draw(g);

        ///////////////////////////
        this.add.text(500, 50, 'draw line 남색 color');
        g.lineStyle(10, 0x0066F); // graphics.lineStyle(lineWidth, color, alpha);
        // g.fillGradientStyle(0xff0000, 0x00ff00, 0xff0000, 0xffff00, 1);
        g.fillStyle(0xFF00FF); // line 일경우 fillStyle이 먹지 않는다.
        g.beginPath();

        g.moveTo(500, 100);
        g.lineTo(600, 100);
        g.lineTo(600, 200);
        g.lineTo(500, 200);

        g.closePath();
        // g.fillStyle(0xFF00FF);
        g.strokePath();

        this.add.text(700, 50, 'fill 분홍 color');
        // g.lineStyle(1, 0x0066F);
        g.beginPath();
        g.fillStyle(0xFF00FF);
        g.lineStyle(2, 0x0066F, 1.0);
        g.fillRect(700, 100,  24, 10);
        g.strokeRect(700, 100, 24, 10);


        g.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
        g.fillRect(250, 300, 100, 100);





        // g.fillStyle(0xffff00);
        // g.lineStyle(2, 0xffffff, 1)
        // // slopeGraphics.moveTo(100, 100);
        //
        // const path = this.add.path(100, 100);
        //
        // path.lineTo(500,100);
        // path.lineTo(500,500);
        // path.lineTo(100,500);
        // path.closePath();
        // path.draw(g);
        // g.fillPoints(path.getPoints())






        // arrow 그리기

        this.drawArrow(g, 10, 300, 100, 400, 10, 0xff0000);  // red
        this.drawArrow(g, 90, 320, 140, 260, 20, 0x000000); // black
    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        // this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path.draw(this.graphics);
    }

    private drawArrow(ctx: any, fromx: number, fromy: number, tox: number, toy: number, arrowWidth: number, color: number){
        // https://codepen.io/chanthy/pen/WxQoVG
        //variables to be used when creating the arrow
        const headlen = arrowWidth * 3;
        const angle = Math.atan2(toy - fromy, tox - fromx);

        ctx.fillStyle(color);
        const path = this.add.path(tox, toy); // 화살표의 꼭지점
        ctx.lineStyle(1, color);
        console.log('after:', tox)

        // 사이드1
        const x1 = tox - headlen * Math.cos(angle - Math.PI / 7);
        const y1 = toy - headlen * Math.sin(angle - Math.PI / 7);
        path.lineTo(x1, y1);
        //
        // path from the side point of the arrow, to the other side point
        const x2 = tox - headlen*Math.cos(angle+Math.PI/7);
        const y2 = toy - headlen*Math.sin(angle+Math.PI/7);
        path.lineTo(x2, y2);
        // 화살표의 안쪽을 채워준다.
        ctx.fillPoints(path.getPoints());
        path.draw(ctx);

        // 화살표의 아래면의 좌표값의 중간 값을 구한다.
        const cx = (x2 + x1) / 2;
        const cy = (y2 + y1) / 2;
        console.log('x1:', x1, 'y1:', y1, 'x2:', x2, 'y2:', y2, 'cx:', cx, 'cy:', cy )

        const inclination = (y1 - y2) / (x1 - x2);
        // 라인을 그려준다.
        ctx.lineStyle(arrowWidth, color);
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(cx, cy);
        ctx.stroke();
        ctx.closePath();


    }

    private drawArrow2(ctx: any, fromx: number, fromy: number, tox: number, toy: number, arrowWidth: number, color: number){
        // https://codepen.io/chanthy/pen/WxQoVG
        //variables to be used when creating the arrow
        var headlen = 10;
        var angle = Math.atan2(toy - fromy, tox - fromx);

        ctx.save();
        // ctx.lineStyle(arrowWidth, color);
        // ctx.strokeStyle = color;

        //starting path of the arrow from the start square to the end square
        //and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        // ctx.lineWidth = arrowWidth;
        ctx.stroke();
        ctx.closePath();

        //starting a new path from the head of the arrow to one of the sides of
        //the point
        ctx.beginPath();
        // ctx.lineStyle(1, color);
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen*Math.cos(angle-Math.PI/7),
                   toy - headlen*Math.sin(angle-Math.PI/7));

        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox - headlen*Math.cos(angle+Math.PI/7),
                   toy - headlen*Math.sin(angle+Math.PI/7));

        // //path from the side point back to the tip of the arrow, and then
        // //again to the opposite side point
        // ctx.lineTo(tox, toy);
        // ctx.lineTo(tox - headlen*Math.cos(angle-Math.PI/7),
        //            toy - headlen*Math.sin(angle-Math.PI/7));

        //draws the paths created above
        ctx.closePath();
        ctx.fillStyle(0xFF00FF);
        ctx.stroke();
        // ctx.restore();
    }



}

