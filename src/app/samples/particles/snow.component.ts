import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-root',
  template: ``
})
export class SnowComponent implements AfterViewInit {
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
    this.load.spritesheet({
      key: 'snowflakes',
      url: 'assets/sprites/snowflakes.png',
      frameConfig: {
        frameWidth: 17,
        frameHeight: 17
      }
    });
    this.load.spritesheet({
      key: 'snowflakes_large',
      url: 'assets/sprites/snowflakes_large.png',
      frameConfig: {
        frameWidth: 64,
        frameHeight: 64
      }
    });
  }

  public create() {


    this.add.particles(0, 0, 'snowflakes', {
      frame: [0, 1, 2, 3, 4, 5],
      x: {
        min: 0,
        max: 800
      },
      y: 0,
      speed: {
        min: 100,
        max: 200
      },
      gravityY: 50,
      lifespan: 10000,
      scale: {
        start: 0.5,
        end: 1
      },
      blendMode: 'ADD',
      // deathZone: { type: 'onEnter', source: rectangles }
    });

    // particles.stop();
    // particles.start();
  }

  // 업데이트될 정보를 입력
  override update() {
    console.log('update');
    // this.graphics.lineStyle(2, 0xffffff, 1);
    // this.path.draw(this.graphics);
  }



}
