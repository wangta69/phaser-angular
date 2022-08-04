import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class ExplodeComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor : '#000',
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
    // private emitter5: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.load.image('spark0', 'assets/particles/blue.png');
        this.load.image('spark1', 'assets/particles/red.png');
    }

    public create()  {
        const g = this.add.graphics();
        g.fillStyle(0xFF00FF);
        g.fillRect(100,  100, 24, 10);
        g.generateTexture('key');
        g.clear();
        // g.strokeRect(x, y, 24, 10);


        // this.emitter5 = this.add.emitter(0, 0, 100);
        const particles: any = this.add.particles('key');

        const emitter = particles.createEmitter();
        emitter.setPosition(400, 200);
        emitter.setSpeed(200);
        emitter.setLifespan(3000);
        emitter.setScale(0.5);

        // emitter.start(true, 2000, null, 10);


        const emitter3: any = this.add.particles('key').createEmitter({
            x: 400,
            y: 200,
            speed: 360,
            angle: 90,
            // scale: { start: 0.3, end: 0 },
            blendMode: 'DARKEN',
            //active: false,
            lifespan: 300,
            gravityY: 0
        });

        const emitter0: any = this.add.particles('spark0').createEmitter({
            x: 200,
            y: 200,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 600,
            gravityY: 800,
            // stop: true
        });
        emitter0.stop();

        const emitter1: any = this.add.particles('spark1').createEmitter({
            x: 400,
            y: 500,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            lifespan: 300,
            gravityY: 800
        });

        this.time.delayedCall(300, () => {
            // emitter0.destroy();
            emitter0.stop();
        });

        this.input.on('pointerdown', (pointer: any) => {
           emitter0.setPosition(pointer.x, pointer.y);
           emitter1.setPosition(pointer.x, pointer.y);
           emitter0.explode(50);
           emitter1.explode(50);
       });
    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        // this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path.draw(this.graphics);
    }



}

