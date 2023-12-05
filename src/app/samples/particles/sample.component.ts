import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-root',
  template: ``
})
export class ParticleComponent implements AfterViewInit {
  // name = 'Angular';
  // public game: Phaser.Game;
  public readonly gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    physics: {
      default: 'arcade',
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
    this.load.atlas('flares', '/assets/particles/flares.png', '/assets/particles/flares.json');
  }

  public create() {


    // particles.createEmitter({
    //     frame: 'blue',
    //     x: 64,
    //     y: { min: 100, max: 500 },
    //     lifespan: 2000,
    //     speedX: { min: 200, max: 400 },
    //     scale: { start: 0.4, end: 0 },
    //     quantity: 4,
    //     blendMode: 'ADD'
    // });

    //     const particles = this.add.particles('flares');
    //     particles.createEmitter({
    //         frame: [ 'red', 'green', 'blue' ],
    //         x: 400,
    //         y: 100,
    //         speed: 300,
    //         gravityY: 400,
    //         lifespan: 4000,
    //         scale: 0.4,
    //         blendMode: 'ADD',
    //         // deathZone: { type: 'onEnter', source: rectangles }
    //     });
    // }

     this.add.particles(100, 100, 'flares', {
      frame: ['red', 'green', 'blue'],
      x: 400,
      y: 100,
      speed: 300,
      gravityY: 400,
      lifespan: 4000,
      scale: 0.4,
      blendMode: 'ADD',
      // deathZone: { type: 'onEnter', source: rectangles }
    });
  }

  // 업데이트될 정보를 입력
  override update() {
    console.log('update');
    // this.graphics.lineStyle(2, 0xffffff, 1);
    // this.path.draw(this.graphics);
  }



}
