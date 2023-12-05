// https://stackabuse.com/introduction-to-phaser-3-building-breakout/
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-root',
  template: ``
})

export class TimeLine implements OnInit {
  public readonly gameConfig = {
    type: Phaser.AUTO,
    width: 800, // 480
    height: 600, // 320
    backgroundColor: '#020286',
  }

  private game: any;
  constructor() {

  }

  ngOnInit() {
    this.game = new Phaser.Game(this.gameConfig);
    this.game.scene.add('main', new MyScene(), true);
  }

}

export class MyScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Scene',
    });
  }

  public preload() {
    this.load.atlas('timeline', 'assets/atlas/timeline.png', 'assets/atlas/timeline.json');
    this.load.image('bg', 'assets/skies/spookysky.jpg');
  }

  public create() {
    this.add.image(400, 300, 'bg');

    this.add.text(10, 10, 'Click to start the Timeline', { font: '16px Courier' }); // , fill: '#ffffff'
    const timeline = this.add.timeline([
      {
        at: 1000,
        tween: {
          targets: this.add.sprite(400, 700, 'timeline', 'tombstone'),
          y: 400,
          duration: 3000,
          ease: 'Power2'
        }
      },
      {
        at: 2000,
        run: () => { this.add.sprite(400, 200, 'timeline', 'spider').setScale(1.5) }
      },
    ]);

    this.input.once('pointerdown', () => {
      timeline.play();
    });
  }

  override update() {
  }


}
