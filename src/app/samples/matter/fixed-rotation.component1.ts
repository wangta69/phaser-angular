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
               debugBodyColor: 0x000000
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

        // this.wheel = this.matter.add.image(50, 0, 'wheel');
        // this.wheel.setFrictionAir(0.001);
        // this.wheel.setBounce(0.6);

        // this.wheel = this.matter.add.circle(50, 0, 30, {
        //     friction: 1,
        //     restitution: 0,
        //     collisionFilter: {
        //         mask: 2
        //     },
        //     // sprite: {
        //     //     texture: 'wheel',
        //     //     xScale: 0.3,
        //     //     yScale: 0.3,
        //     // },
        //     label: 'wheel'
        // });

        // const wheelShape = (Phaser.Physics.Matter as any).Matter.Bodies.circle(50, 0, 30, {
        //     label: 'wheel',
        //     render: {
        //         sprite: {
        //           texture: '/assets/images/risky/car-wheel.png'
        //           //Is there a 'width:' or 'height' property?
        //         }
        //       }
        // });

        // add front wheel. A circle
        this.wheel = this.matter.add.circle(100, 0, 30, {
            friction: 1,
            restitution: 0,
            collisionFilter: {
                mask: 2
            },
            label: 'wheel',
            // render: {
            //     sprite: {
            //       // texture: '/assets/images/risky/car-wheel.png'
            //       texture: 'wheel'
            //       //Is there a 'width:' or 'height' property?
            //     }
            //   }
        });

        // this.wheel.setFrictionAir(0.001);
        // this.wheel.setBounce(0.6);

        //
        // this.frontWheel = this.matter.add.circle(posX + 35, posY + 25, 30, {
        //     friction: 1,
        //     restitution: 0,
        //     collisionFilter: {
        //         mask: 2
        //     },
        //     label: 'wheel'
        // });


        // this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: wheelShape});


        // this.block = this.matter.add.image(50, 0, 'block');
        //
        // this.block.setFrictionAir(0.001);
        // this.block.setBounce(0.6);

        const ground = this.matter.add.image(400, 400, 'platform', undefined, { isStatic: true });

        ground.setScale(2, 0.5);
        ground.setAngle(10);
        ground.setFriction(0);

    }





    override update(){
        // 화면 밖으로 사라지면 새로 시작
        // if (this.block.y > 600)
        // {
        //     this.block.setPosition(50, 0);
        //     this.block.setVelocity(0, 0);
        //
        //     // this.wheel.setPosition(50, 0);
        //     // this.wheel.setVelocity(0, 0);
        // }
    }


}

