// https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Matter.html#.MatterBodyConfig
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
@Component({
  selector: 'app-root',
  template:`<div id = "thegame"></div>`
})
export class FixedRotationComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        type: Phaser.AUTO,
       backgroundColor: 0x75d5e3,
       scale: {
           mode: Phaser.Scale.FIT,
           autoCenter: Phaser.Scale.CENTER_BOTH,
           parent: 'thegame',
           width: 800,
           height: 600
       },
       physics: {
           default: 'matter',
           matter: {
               debug: true,
               debugBodyColor: 0x000000,
               // gravity: {x: 0, y: 0.01},
           }
       },
       scene: playGame
    }

    private game: any;

    constructor(
    ) { }

    ngOnInit() {
      this.game = new Phaser.Game(this.gameConfig);

    }

    ngAfterViewInit() {

    }
}

export class playGame extends Phaser.Scene {
    private canvas: any;
    private block: any;
    private wheel: any;


    constructor() {
        super({
            key: 'PlayGame',
        });
    }

    public preload()  {
        this.canvas = this.sys.game.canvas;
        this.load.image('block', 'assets/sprites/block.png');
        this.load.image('platform', 'assets/sprites/platform.png');

        this.load.image('wheel', '/assets/images/risky/car-wheel.png');
        this.load.image('body', '/assets/images/risky/car-body.png');


    }

    public create()  {
        this.wheel = this.matter.add.image(50, 0, 'wheel');
        this.wheel.setBody({
            type: 'circle',
            radius: this.wheel.width / 2
        }, {
            label: 'wheelFront',
            // collisionFilter: {
            //   group: group
            // },
            friction: 1,
            // density
        });
        this.wheel.setBounce(0.9)


        console.log('this.wheel >>', this.wheel);
        // new Phaser.Sprite(world, x, y, texture, [frame], [options])
        // this.wheel.setTexture('wheel')

        this.block = this.matter.add.image(50, 0, 'block', undefined, {
            friction: 1,
            restitution: 0,
            label: 'wheel',
            // density: 0.000001
        });
        // this.block.set
        //
        // this.block.setFrictionAir(0.001);
        // this.block.setBounce(0.6);

        const ground = this.matter.add.image(400, 400, 'platform', undefined, { isStatic: true });

        ground.setScale(2, 0.5);
        ground.setAngle(10);
        ground.setFriction(0);

    }





    override update(){
        this.wheel.setAngularVelocity(0.03)
        this.wheel.setAngularVelocity(0.01)
        // this.wheel.setAngularVelocity(0.1)
        // 화면 밖으로 사라지면 새로 시작
        if (this.block.y > 600)
        {
            this.block.setPosition(50, 0);
            this.block.setVelocity(0, 0);

            this.wheel.setPosition(50, 0);
            this.wheel.setVelocity(0, 0);
        }
    }


}

