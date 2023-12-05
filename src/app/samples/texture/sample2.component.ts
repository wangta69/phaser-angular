import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template: ``
})
export class Texture2Component implements AfterViewInit {
  // name = 'Angular';
  // public game: Phaser.Game;
  public readonly gameConfig = {
    type: Phaser.AUTO,
    // type: Phaser.CANVAS,
    parent: "phaser-example",
    width: 800,
    height: 600,
    backgroundColor: "#000000",
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

  constructor() {}

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

  public preload() {
    this.load.image('brush', '/assets/images/texture/sparkle1.png');
    this.load.image('pattern', '/assets/images/tank/forest-pattern.jpg'); // 100 x 100
    this.load.image('pattern-snow', '/assets/images/tank/snow-pattern.jpg'); // 100 x 100
    this.load.image('bg', '/assets/images/tank/forest-bg.png');
  }

  public create() {
    this.add.image(0, 0, 'bg').setOrigin(0); //  배경 그림을 올린다.

    const SCALE = 0.1;
    const texture = this.textures.createCanvas('canvastexture', 800, 600);

    const grass: any = this.textures.get('pattern').getSourceImage();

    // this.textures.get('pattern').getSourceImage();
    const grassBase64: any = this.textures.getBase64('pattern-snow');


    // 패턴으로채우기 (패턴 이미지 100 x 100, canvas 800 x 600)
    for (let i = 0; i < 8; i++) {

      for (let j = 0; j < 6; j++) {
        const x = i * 100;
        const y = j * 100;
        console.log(x, y);
        texture?.draw(x, y, grass);
        // texture.setTexture()
      }
    }

    this.add.image(0, 0, 'canvastexture').setOrigin(0); // 생성된 texture(canvas)를 메인 canvas 위에 올린다.

    if (texture) {
      texture.getContext().globalCompositeOperation = 'destination-in'; // 'destination-in' 충첩되지 않는  부분만 남긴다.

      // texture.getContext().createPattern(grass, 'repeat');

      const g: any = this.make.graphics({
        x: 0,
        y: 0,
        // add: false
      });
      g.lineStyle(10, 0x0066F); // graphics.lineStyle(lineWidth, color, alpha);
      g.fillStyle(0xFF00FF, 1.0); // line 일경우 fillStyle이 먹지 않는다.
      g.beginPath();

      g.moveTo(0, 600);
      g.lineTo(0, 400);
      g.lineTo(100, 300);
      g.lineTo(200, 350);
      g.lineTo(300, 500);
      g.lineTo(400, 550);
      g.lineTo(500, 500);
      g.lineTo(600, 550);
      g.lineTo(700, 500);
      g.lineTo(800, 600);
      g.closePath();
      g.fillPath();
      g.strokePath();
      g.generateTexture('newKey', 800, 600); // key, width, height
      g.destroy();

      const newKey: any = this.textures.get('newKey').getSourceImage();

      texture.draw(0, 0, newKey);
    }
  }

  // 업데이트될 정보를 입력
  override update() {}

}
