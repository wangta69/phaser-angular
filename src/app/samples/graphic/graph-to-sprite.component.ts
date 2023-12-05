import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class GraphToSpriteComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      type: Phaser.AUTO,
      // type: Phaser.CANVAS,
      width: 800,
      height: 600,
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

        const starGraphics = this.make.graphics({x: 0, y: 0, add: false});
        this.drawStar(starGraphics, 105, 105,  5, 100, 50, 0xFFFF00, 0xFF0000);
        starGraphics.generateTexture('starGraphics', 210, 210);
        const image = this.add.image(400, 300, 'starGraphics');
    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        // this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path.draw(this.graphics);
    }

    private drawStar (graphics: any, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: number, lineColor: number) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;
        graphics.lineStyle(10, lineColor, 1.0);
        graphics.fillStyle(color, 1.0);
        graphics.beginPath();
        graphics.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            graphics.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            graphics.lineTo(x, y);
            rot += step;
        }
        graphics.lineTo(cx, cy - outerRadius);
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();
    }
}

