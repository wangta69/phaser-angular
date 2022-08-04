import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class BombComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor : '#fff',
      physics: {
        default : 'arcade',
        arcade: {
            gravity: { y: 300 },
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
    private airplane: any;
    private platforms: any;
    private bomb: any;
    private flares: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.load.image('airplane', '/assets/images/airplane/airplane.png');
        this.load.image('bomb', '/assets/images/airplane/bomb.png');
        this.load.image('ground', '/assets/images/study1/platform.png');
        this.load.atlas('flares', '/assets/particles/flares.png', '/assets/particles/flares.json');
    }

    public create()  {

        this.flares = this.add.particles('flares').createEmitter({
            frame: [ 'red', 'green', 'blue' ],
            x: 200,
            y: 200,
            speed: { min: -800, max: -200 },
            angle: { min: 180, max: 360 },
            scale: { start: 0.2, end: 0 },
            // blendMode: 'ADD',
            active: false,
            lifespan: 200,
            gravityY: 100,
            // deathZone: { type: 'onEnter', source: rectangles }
        });
    //).stop();

        this.airplane = this.add.image(0, 0, 'airplane');
        this.airplane.y = 100;
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(250, 520, 'ground').setScale(2, 0.5).refreshBody();
        this.bomb = this.physics.add.group();
        // this.bomb = this.physics.add.sprite(this.airplane.x, this.airplane.y, 'bomb');

        this.physics.add.collider(this.bomb, this.platforms, (bomb: any, plarforms: any) => {
            console.log(bomb.x, bomb.y);
            this.flares.setPosition(bomb.x, bomb.y);
            this.flares.active = true;
            this.flares.explode(50);

            bomb.destroy();
            // private destroy(cannonball: any, pirateship: any) {
            //         pirateship.disableBody(true, true);
            //         cannonball.disableBody(true, true);
            //         this.control = false;
            // }
        });
    }

    // 업데이트될 정보를 입력
    override update(time: number, delta: number)  {
        // console.log('update: ', time, delta);
        this.airplane.x ++;
        if (this.airplane.x % 100 === 0) {
            this.dropBomb();
        }
    }
    private addBomb() {


        // const bomb = this.physics.add.sprite(this.airplane.x, this.airplane.y, 'bomb');
        // bomb.setScale(0.5);
        // this.bomb.add(bomb);

        this.bomb.create(this.airplane.x, this.airplane.y, 'bomb').setScale(0.5).refreshBody()
//        this.bomb.create(this.airplane.x, this.airplane.y, 'bomb')


    }
    private dropBomb() {
        console.log('===========================');

        this.addBomb();
        setTimeout(() => {
            this.addBomb();
        }, 500);
    }

}

