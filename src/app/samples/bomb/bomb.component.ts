import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
@Component({
  selector: 'app-root',
  template: ``
})
export class BombComponent implements AfterViewInit {
  public readonly gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x75d5e3,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 1334,
      height: 750
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 300
        },
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
    this.game.scene.add('PlayGame', new PlayGame(), true);
  }

  ngAfterViewInit() {

  }
}

export class PlayGame extends Phaser.Scene {
  private airplane: any;
  private platforms: any;
  private bomb: any;
  private canvas: any;

  private gameOptions = {
    startTerrainHeight: 0.5,
    amplitude: 300,
    slopeLength: [100, 350],
    // slopeLength: [1000, 1000],
    worldScale: 30
  }

  private sliceStart: any; // = new Phaser.Math.Vector2(0, Math.random());
  private slopeGraphics: any;

  private userTer: any = [
    [0.4, 0.999, 0.3, 0.1, 0.05, 0.9, 0.999, 0.01, 0], // Forest
    [0.1, 0.2, 0.3, 0.32, 0.33, 0.32, 0.31, 0.001, 0.1], // desert
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.001, 0.1] // city
  ];

  constructor() {
    super({
      key: 'PlayGame',
    });
  }

  public preload() {
    this.canvas = this.sys.game.canvas;
    this.load.image('airplane', '/assets/images/airplane/airplane.png');
    this.load.image('bomb', '/assets/images/airplane/bomb.png');
    this.load.image('ground', '/assets/images/study1/platform.png');
    this.load.atlas('flares', '/assets/particles/flares.png', '/assets/particles/flares.json');
  }

  public create() {



    this.slopeGraphics = this.add.graphics();

    this.sliceStart = new Phaser.Math.Vector2(0, Math.random());

    this.airplane = this.add.image(0, 0, 'airplane');
    this.airplane.y = 100;
    this.platforms = this.physics.add.staticGroup();
    // this.physicGraphics = this.physics.add.group();
    // this.physicGraphics.gravity = 0;
    // this.physicGraphics = this.physics.add.group();
    this.platforms.create(250, 520, 'ground').setScale(1, 0.5).refreshBody();
    this.bomb = this.physics.add.group();

    this.drawTerrain(this.sliceStart);
    // this.bomb = this.physics.add.sprite(this.airplane.x, this.airplane.y, 'bomb');

    this.physics.add.collider(this.bomb, this.platforms, (bomb: any, plarforms: any) => {
      bomb.flares.setPosition(bomb.x, bomb.y);
      bomb.flares.active = true;
      bomb.flares.explode(50);

      bomb.destroy();

    });

    this.physics.add.collider(this.bomb, this.slopeGraphics, (physicGraphics: any, bomb: any) => {

      // this.physics.add.collider(this.bomb, this.slopeGraphics, (bomb: any, physicGraphics: any) => {

      bomb.flares.setPosition(bomb.x, bomb.y);
      bomb.flares.active = true;
      bomb.flares.explode(50);

      bomb.destroy();

    });


  }

  private drawTerrain(sliceStart: any) {

    //
    // const ter = this.userTer[1];
    // // const sepratePoint = Math.floor(this.canvas.width / ter[0].length);
    // // console.log(sepratePoint );
    //
    // const terrainPoints = [];
    // // let slopes = 0;
    // let slopeStartX = 0; // 변곡시작점 X
    // let slopeStartHeight = this.convertTerrainValue(ter, 0);
    //
    // // x 가 0에서 부터 증가하다가 ccurrentSlopeWidth 와 만나면 각을 꺽는 방식이다.
    // let ccurrentSlopeWidth = Math.floor(this.canvas.width / (ter.length - 2))// 주어진 slopeLength 사이에서 임의의 값을 추출한다.
    //
    // let slopeEndX = slopeStartX + ccurrentSlopeWidth; // 변곡점 x
    // let slopeEndHeight = this.convertTerrainValue(ter, 1);
    // let terrainX = 0;
    // let terrainY = 0;
    // // console.log('ccurrentSlopeWidth: ', ccurrentSlopeWidth);
    // let i = 1;
    // while(terrainX < this.canvas.width){
    //     if (terrainX == slopeEndX) { // 변곡구간에 오면 다음 변곡 구간까지의 새로운 좌표를 만들어 준다.
    //         i++;
    //         // slopes ++;
    //         slopeStartHeight = slopeEndHeight; // random
    //         slopeEndHeight = this.convertTerrainValue(ter, i);
    //
    //         terrainY = this.canvas.height * this.gameOptions.startTerrainHeight + slopeStartHeight * this.gameOptions.amplitude;
    //         slopeStartX = terrainX;
    //         // ccurrentSlopeWidth = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]);
    //
    //         slopeEndX += ccurrentSlopeWidth; // 1~ canvas width 사이의 특정
    //
    //     }else{
    //         terrainY = (this.canvas.height * this.gameOptions.startTerrainHeight) + this.interpolate(slopeStartHeight, slopeEndHeight, (terrainX - slopeStartX) / (slopeEndX - slopeStartX)) * this.gameOptions.amplitude;
    //     }
    //
    //     terrainPoints.push(new Phaser.Math.Vector2(terrainX, terrainY))
    //     terrainX ++ ;
    // }
    // const simpleSlope = simplify(terrainPoints, 1, true);

    // this.slopeGraphics.x = sliceStart.x;
    // this.slopeGraphics.clear();
    // this.slopeGraphics.moveTo(0, this.canvas.height);
    // this.slopeGraphics.fillStyle(0x654b35);
    // this.slopeGraphics.beginPath();
    // simpleSlope.forEach((point: any) => {
    //     this.slopeGraphics.lineTo(point.x, point.y);
    // })
    // this.slopeGraphics.lineTo(terrainX, this.canvas.height);
    // this.slopeGraphics.lineTo(0, this.canvas.height);
    // this.slopeGraphics.closePath();
    // this.slopeGraphics.fillPath();
    // this.slopeGraphics.lineStyle(16, 0x6b9b1e);
    // this.slopeGraphics.beginPath();
    // simpleSlope.forEach((point: any) =>{
    //     this.slopeGraphics.lineTo(point.x, point.y);
    // })
    // // this.slopeGraphics.closePath();
    // this.slopeGraphics.strokePath();
    //
    //
    // this.physics.add.existing(this.slopeGraphics);
    // // console.log('terrain >>', terrain);
    // // terrain.world.setCollideWorldBounds(true);
    // this.slopeGraphics.body.collideWorldBounds = true;

    console.log('-----------------------------------')
    //     const g: any = this.add.graphics({x: 0,
    //     y: 0,
    //     lineStyle: {
    //         width: 1,
    //         color: 0xffffff,
    //         alpha: 1
    //     },
    //     fillStyle: {
    //         color: 0xffffff,
    //         alpha: 1
    //     }
    // });








    // const player: any = this.add.rectangle(100, 100, 400, 400, 0xffffff);
    //
    // this.physics.add.existing(player, false);
    // player.body.setCollideWorldBounds(true);
    //
    //
    // this.slopeGraphics.fillStyle(0xffff00);
    // this.slopeGraphics.lineStyle(2, 0xffffff, 1)
    // slopeGraphics.moveTo(100, 100);

    const path = this.add.path(100, 100);
    this.slopeGraphics.fillStyle(0xffff00);
    path.lineTo(500, 100);
    path.lineTo(500, 500);
    path.lineTo(100, 500);
    path.closePath();
    path.draw(this.slopeGraphics);
    this.slopeGraphics.fillPoints(path.getPoints())
    this.physics.add.existing(this.slopeGraphics, false);
    this.slopeGraphics.body.enable = true;
    // this.slopeGraphics.body = new Phaser.Body(world, gameObject);
    // this.slopeGraphics.body.setSize(700,15);
    console.log('g.body >>', this.slopeGraphics.body);
    // g.body.setPosition(500, 500)
    // // console.log('terrain >>', terrain);
    // // terrain.world.setCollideWorldBounds(true);
    this.slopeGraphics.body.move = false;
    this.slopeGraphics.body.collideWorldBounds = true;
    this.slopeGraphics.body.velocity.x = 0;
    this.slopeGraphics.body.velocity.y = 0;
    this.slopeGraphics.body.bounce.x = 1;
    this.slopeGraphics.body.bounce.y = 1;











    //     /* SET UP GRAPHIC */
    // const mgraphic: any = this.add.graphics();
    // mgraphic.fillStyle(0xffff00, 1);
    // mgraphic.fillRoundedRect(0, 0, 700, 15, 0);
    //
    // /* ENABLE ARCADE PHYSICS OBJECT ON GRAPHIC */
    // this.physics.add.existing(mgraphic);
    // // mgraphic.body.setSize(700,15);
    // mgraphic.body.velocity.x = 0;
    // mgraphic.body.velocity.y = 0;
    // // mgraphic.body.bounce.x = 1;
    // // mgraphic.body.bounce.y = 1;
    // mgraphic.body.collideWorldBounds = true;

    // graphics.gravity = 0;
    // graphics.body.collideWorldBounds = true;
    // this.physicGraphics.add(graphics);
    // this.physics.world.enable(graphics);


  }

  private convertTerrainValue(ter: any, n: number) {
    return 1 - ter[n];
  }

  private interpolate(vFrom: number, vTo: number, delta: number) {
    const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
    return vFrom * (1 - interpolation) + vTo * interpolation;
  }

  // 업데이트될 정보를 입력
  override update(time: number, delta: number) {
    this.airplane.x++;
    if (this.airplane.x % 100 === 0) {
      this.dropBomb();
    }

    if (this.airplane.x > this.canvas.width) {
      this.time.addEvent({
        delay: 1000,
        // callbackScope: this,
        callback: () => {
          // this.matter.add.polygon(Phaser.Math.Between(0, this.canvas.width), -50, Phaser.Math.Between(3, 10), Phaser.Math.Between(10, 40));

          this.scene.start("PlayGame");
        },
        // loop: true
      });
    }
  }
  private addBomb() {

    const bomb = this.bomb.create(this.airplane.x, this.airplane.y, 'bomb').setScale(0.5).refreshBody()
    bomb.flares = this.add.particles(0, 0, 'flares', {
      frame: ['red', 'yellow'],
      speed: {
        min: -50,
        max: 50
      },
      angle: {
        min: 180,
        max: 360
      },
      scale: {
        start: 0.2,
        end: 0.25
      },
      // blendMode: 'ADD',
      active: false,
      alpha: {
        start: 1,
        end: 0
      },
      lifespan: 2000,
      gravityY: 30,
      // deathZone: { type: 'onEnter', source: rectangles }
    });

    
  }
  private dropBomb() {
    this.addBomb();
    setTimeout(() => {
      this.addBomb();
    }, 500);
  }

}
