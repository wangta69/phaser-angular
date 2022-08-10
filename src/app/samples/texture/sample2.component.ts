import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class Texture2Component implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        // type: Phaser.CANVAS,
        type: Phaser.AUTO,
        parent: "phaser-example",
        width: 800,
        height: 600,
        backgroundColor: "#2d2d88",
        // scene: {
        //   preload: preload,
        //   create: create
        // },
        loader: {
          // baseURL: "/assets/images/texture/",
          // crossOrigin: "anonymous"
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
        this.load.image('grass', 'assets/images/grass.jpg');
        // this.load.image('grass', 'assets/images/button.png');
        this.load.image('undersea', 'assets/pics/undersea.jpg');

        // this.load.atlas('megaset', 'assets/atlas/megaset-0.png', 'assets/atlas/megaset-0.json');
    }

    public create()  {

        const g: any = this.add.graphics();
        // 패턴으로 채우기 & mask 처리하기
        const pattern = this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0, 0).setVisible(true)
        g.fillCircle(150, 150, 100);
        // const circleShape = this.make.graphics({}, true).fillCircle(150, 150, 100);
        pattern.setMask(g.createGeometryMask());


        // const backgroundImage = this.add.image(0, 0, 'undersea').setOrigin(0, 0).setVisible(true);
        // const rectangleShape = g.fillRect(300, 300, 200, 200)
        // backgroundImage.setMask(rectangleShape.createGeometryMask());



        const pattern1 = this.add.tileSprite(0, 0, 800, 600, 'grass').setOrigin(0, 0).setVisible(true)
        const path = this.add.path(300, 100); // 시작점
         // path.splineTo([ 164, 446, 274, 542, 412, 457, 522, 541, 664, 464 ]);
        path.lineTo(400, 100);
        path.lineTo(400, 200);
        //  cubicBezierTo: function (x, y, control1X, control1Y, control2X, control2Y)
        path.cubicBezierTo(250, 200, 200, 100, 400, 100);
        path.closePath();
        g.fillPoints(path.getPoints()); //

        path.draw(g);
        pattern1.setMask(g.createGeometryMask());














       //  const graphics: any = this.add.graphics();
       //
       //  // graphics.setTexture('megaset', 'contra1');
       //  graphics.fillStyle(0x00ff00);
       //  const rect = graphics.fillRect(100, 100, 256, 256).setVisible(true);
       //
       //
       //  // graphics.setTexture('megaset', 'dragonwiz', 1);
       //  //
       //
       //graphics.fillGradientStyle(0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 1);
       //  graphics.fillRect(350, 300, 256, 256);
       //
       //
       //
       //  const rt: any = this.add.renderTexture(
       //      100,
       //      10,
       //      500,
       //      50
       //  );
       //  const pattern = this.add.tileSprite(0, 0, 500, 500, 'grass');
       //  pattern.setVisible(false);
       //  rt.draw(pattern, 10, 10);
       //
       //  const rt1 = this.add.renderTexture(0, 0, 800, 600);
       //
       // const circle = this.add.circle(200, 200, 80, 0x6666ff);
       // circle.setVisible(false);
       // rt1.draw(circle, 500, 500);




        // const pieceShape: any = this.add.graphics().fillRect(300, 300, 200, 200);  // 위와 문법 동일

        // const rt2 = this.make.renderTexture({
        //     x: 0,
        //     y: 0,
        //     width: 10,
        //     height: 10,
        // }, false)
            // .setOrigin(0, 0);

        // const pieceShape = this.make.graphics({}, true)
        //     .fillCircle(300, 300, 200);

        // const undersea = this.add.image(0, 0, 'undersea')
        //     .setOrigin(0, 0)
        //     .setVisible(true);

        // const undersea = this.add.tileSprite(400, 300, 800, 600, 'grass');
        // undersea.setVisible(true);
        // //
        // undersea.setMask(pieceShape.createGeometryMask());
        // //
        // rt2.draw(
        //     undersea,
        //     100,
        //     100,
        //     1,
        // );
    }

    private erase(canvasTexture: any, source: any, x: number, y: number) {
        canvasTexture.getContext().globalCompositeOperation = 'destination-out';

        canvasTexture.draw(x, y, source);
    }

    // 업데이트될 정보를 입력
    // override update()  {
    //
    //     // this.graphics.lineStyle(2, 0xffffff, 1);
    //     // this.path.draw(this.graphics);
    // }
    public init() {
        console.log('init....');
    }
    public render() {
        console.log('renderer....');
    }



}

