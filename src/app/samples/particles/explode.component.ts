import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template: `<span>화면을 클릭하세요</span>`
})
export class ExplodeComponent implements AfterViewInit {
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
  // private emitter5: any;
  constructor() {
    super({
      key: 'Scene',
    });
  }

  public preload() {
    this.load.image('spark0', 'assets/particles/blue.png');
    this.load.image('spark1', 'assets/particles/red.png');
  }

  public create() {
    const g = this.add.graphics();
    g.fillStyle(0xFF00FF);
    g.fillRect(100, 100, 24, 10);
    g.generateTexture('key');
    g.clear();

    const emitter0 = this.add.particles(100, 100, 'spark0', {
      speed: {
        min: -800,
        max: 800
      },
      angle: {
        min: 0,
        max: 360
      },
      scale: {
        start: 0.5,
        end: 0
      },
      blendMode: 'SCREEN',
      //active: false,
      lifespan: 600,
      gravityY: 800,
      // stop: true
    });
    

    const emitter1 = this.add.particles(200, 100, 'spark1', {
      // x: 300,
      speed: {
        min: -800,
        max: 800
      },
      angle: {
        min: 0,
        max: 360
      },
      scale: {
        start: 0.3,
        end: 0
      },
      blendMode: 'SCREEN',
      //active: false,
      lifespan: 300,
      gravityY: 800
    });
    emitter0.stop();
    emitter1.stop();
    // this.time.delayedCall(300, () => {

    //   emitter0.stop();
    // });

    this.input.on('pointerdown', (pointer: any) => {
      emitter0.setPosition(pointer.x, pointer.y);
      // emitter1.setPosition(pointer.x, pointer.y);
      emitter0.explode(50);
      // emitter1.explode(50);
      emitter1.explode(50, pointer.x, pointer.y);
    });
  }

  // 업데이트될 정보를 입력
  override update() {
    console.log('update');
    // this.graphics.lineStyle(2, 0xffffff, 1);
    // this.path.draw(this.graphics);
  }



}
