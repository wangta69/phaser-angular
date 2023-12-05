import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template: `<span>마우스를 움직여 보세요</span>`
})
export class TrailComponent implements AfterViewInit {
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

  constructor() {
    super({
      key: 'Scene',
    });
  }

  public preload() {
    // this.canvas = this.sys.game.canvas;
    this.load.image('player', '/assets/images/circular/player.png');
    this.load.image('particle', '/assets/images/circular/particle.png');
  }

  public create() {
    const player = this.add.sprite(100, 100, "player");

    this.input.on('pointermove', (e: any) => {

      player.x = e.x;
      player.y = e.y;
    });

    // creating a particle system uising 'particle' image
    const emitter = this.add.particles(0, 0, 'particle', {
      // particle speed - particles do not move
      speed: 0,
      // particle scale: from 1 to zero
      scale: {
        start: 1,
        end: 0
      },
      // particle alpha: from opaque to transparent
      alpha: {
        start: 1,
        end: 0
      },
      // particle frequency: one particle every 100 milliseconds
      frequency: 10,
      // particle lifespan: 1 second
      lifespan: 2000
    });
    emitter.startFollow(player);
  }

  // 업데이트될 정보를 입력
  override update() {
  }
}
