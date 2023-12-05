// https://stackabuse.com/introduction-to-phaser-3-building-breakout/
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-root',
  template: ``
})

export class Animation implements OnInit {
  public readonly gameConfig = {
    type: Phaser.AUTO,
    width: 800, // 480
    height: 600, // 320
    backgroundColor: '#71c5cf',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false, // true 시 물리적 바운드 및 방향성 표시
        setBounds: false
      }
    },
    // parent: null,
    callbacks: {
      postBoot: function (game: any) { // 상기 width, height에 초기 설정 및 이미지를 설정후 아래처럼  스케일을 변경한다.
        game.canvas.style.width = '100%';
        game.canvas.style.height = '100%';
      }
    }
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
  // Phaser >> Physics >> Arcade >> Sprite >> Body
  // private ball!: Phaser.Physics.Arcade.Sprite;
  // private paddle!: Phaser.Physics.Arcade.Sprite;
  //
  // private bricks!:Phaser.Physics.Arcade.Group;
  // scoreText!:  Phaser.GameObjects.Text;

  private jellyfish: any;
  private crab: any;
  private greenJellyfish: any;
  private octopus: any;
  private purpleFish: any;
  private seahorse: any;
  private squid: any;
  private stingray: any;
  private flyingfish: any;

  constructor() {
    super({
      key: 'Scene',
    });
  }

  public preload() {
    // this.load.atlasXML('seacreatures', '/assets/sprites/seacreatures.png', '/assets/sprites/seacreatures.xml');
    this.load.atlas('sea', '/assets/animations/seacreatures_json.png', '/assets/animations/seacreatures_json.json');
    this.load.image('undersea', 'assets/pics/undersea.jpg');
    this.load.image('coral', 'assets/pics/seabed.png');

    // this.load.crossOrigin = 'anonymous';
    // this.load.baseURL = '/';
    // // this.load.image('ball', 'img/ball.png');
    // this.load.spritesheet('ball', 'assets/images/wobble.png', { frameWidth: 20, frameHeight: 20 });
    // this.load.image('paddle', 'assets/images/paddle.png');
    // this.load.image('brick',  'assets/images/brick.png');
    //
    // // 시작 버튼 추가
    // this.load.spritesheet('button', 'assets/images/button.png', { frameWidth: 120, frameHeight: 40 });

  }

  public create() {
    this.add.image(400, 300, 'undersea');

    this.anims.create({
      key: 'jellyfish',
      frames: this.anims.generateFrameNames('sea', {
        prefix: 'blueJellyfish',
        end: 32,
        zeroPad: 4
      }),
      repeat: -1
    });
    this.anims.create({
      key: 'crab',
      frames: this.anims.generateFrameNames('sea', {
        prefix: 'crab1',
        end: 25,
        zeroPad: 4
      }),
      repeat: -1,
      duration: 100
    });
    this.anims.create({
      key: 'octopus',
      frames: this.anims.generateFrameNames('sea', {
        prefix: 'octopus',
        end: 24,
        zeroPad: 4
      }),
      repeat: -1
    });
    this.anims.create({
      key: 'purpleFish',
      frames: this.anims.generateFrameNames('sea', {
        prefix: 'purpleFish',
        end: 20,
        zeroPad: 4
      }),
      repeat: -1
    });
    this.anims.create({
      key: 'stingray',
      frames: this.anims.generateFrameNames('sea', {
        prefix: 'stingray',
        end: 23,
        zeroPad: 4
      }),
      repeat: -1
    });

    // const jellyfish = this.add.sprite(400, 300, 'seacreatures');
    const jellyfish = this.add.sprite(400, 300, 'seacreatures').play('jellyfish');
    const bigCrab = this.add.sprite(550, 480, 'seacreatures').setOrigin(0).play('crab');
    const smallCrab = this.add.sprite(730, 515, 'seacreatures').setScale(0.5).setOrigin(0).play('crab');
    const octopus = this.add.sprite(100, 100, 'seacreatures').play('octopus');
    const fish = this.add.sprite(600, 200, 'seacreatures').play('purpleFish');
    const ray = this.add.sprite(100, 300, 'seacreatures').play('stingray');

    this.add.image(0, 466, 'coral').setOrigin(0);

    this.tweenMove(jellyfish, {
      x: 0
    });
    this.tweenMove(octopus, {
      y: 70
    });
    this.tweenMove(fish, {
      scaleX: 1.5,
      scaleY: 1.5
    });
    this.tweenMove(ray, {});
  }

  private tweenMove(target: any, motion: any) {
    this.tweens.add(Object.assign(motion, {
      targets: target,
      ease: 'Phaser.Easing.Quadratic.InOut',
      duration: 10000, // 1회 끝나는데 소요되는 진행시간
      // delay: i * 50,
      repeat: -1, // -1 은 무한 반복
      yoyo: true, // 왔다리 갔다리
      // hold: 1000,
      // repeatDelay: 1000
    }));
  }


}
