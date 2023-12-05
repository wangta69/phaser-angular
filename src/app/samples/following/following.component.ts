// https://stackabuse.com/introduction-to-phaser-3-building-breakout/
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-root',
  template: ``
})

export class Following implements OnInit {
  public readonly gameConfig = {
    type: Phaser.AUTO,
    width: 800, // 480
    height: 600, // 320
    backgroundColor: '#2d2d2d',
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


  private graphics: any;
  private path: any;
  private follower: any;

  constructor() {
    super({
      key: 'Scene',
    });
  }

  public preload() {
  }

  public create() {
    this.graphics = this.add.graphics();

    this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

    //  The curves do not have to be joined
    const line1 = new Phaser.Curves.Line([ 100, 100, 500, 200 ]);
    const line2 = new Phaser.Curves.Line([ 200, 300, 600, 500 ]);

    this.path = this.add.path(0, 0);

    // path = new Phaser.Curves.Path();

    this.path.add(line1);
    this.path.add(line2);

    this.tweens.add({
        targets: this.follower,
        t: 1,
        ease: 'Linear',
        duration: 4000,
        yoyo: true,
        repeat: -1
    });
  }

  override update() {
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xffffff, 1);

    this.path.draw(this.graphics);

    this.path.getPoint(this.follower.t, this.follower.vec);

    this.graphics.fillStyle(0xff0000, 1);
    this.graphics.fillRect(this.follower.vec.x - 8, this.follower.vec.y - 8, 16, 16);
  }


}
