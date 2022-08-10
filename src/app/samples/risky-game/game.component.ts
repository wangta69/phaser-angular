// https://www.emanueleferonato.com/wp-content/uploads/2021/04/terrain/terrain.zip
// https://www.emanueleferonato.com/2019/08/10/the-basics-of-infinite-terrain-generation-for-a-horizontal-endless-runner/ 이것도 보면 좋을 듯
// https://www.emanueleferonato.com/wp-content/uploads/2019/11/risky/risky.zip
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
@Component({
  selector: 'app-root',
  template:`<div id = "thegame"></div>`
})
export class RiskyGameComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        type: Phaser.AUTO,
       backgroundColor: 0x75d5e3,
       scale: {
           mode: Phaser.Scale.FIT,
           autoCenter: Phaser.Scale.CENTER_BOTH,
           parent: 'thegame',
           width: 750,
           height: 1334
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
    private body: any;

    private frontWheel: any;
    private rearWheel: any;

    private isAccelerating: any;

    private gameOptions = {
        // car acceleration
        carAcceleration: 0.01,
        // maximum car velocity
        maxCarVelocity: 1
    }

    constructor() {
        super({
            key: 'PlayGame',
        });
    }

    public preload()  {
        this.canvas = this.sys.game.canvas;
        this.load.image('wheel', '/assets/images/risky/car-wheel.png');
        this.load.image('body', '/assets/images/risky/car-body.png');
    }

    public create()  {
        this.addGround();
        // method to add the car, arguments represent x and y position
        this.addCar(250, this.canvas.height / 2 - 70);

        // input management
        this.input.on('pointerdown', () => { this.isAccelerating = true; console.log('this.isAccelerating', this.isAccelerating);});
        this.input.on('pointerup', () => { this.isAccelerating = false;});

    }

    private addGround() {
        // create a new rectangle body
        let body: any = this.matter.add.rectangle(0, 700, 2000, 10, {
            isStatic: true,
            angle: 0.1,
            friction: 1,
            restitution: 0,
            collisionFilter: {
                category: 2
            },
            label: 'ground'
        });
    }

    // method to build the car
    private addCar(posX: number, posY: number){
        this.body = this.matter.add.image(posX + 35, posY + 20, 'body', undefined, {
            // isStatic: true,
            friction: 1,
            restitution: 0,
            collisionFilter: {
                mask: 2
            },
            label: 'body'
        });

        this.frontWheel = this.matter.add.image(posX + 100, posY + 45, 'wheel', undefined, {
            friction: 1,
            restitution: 0,
            collisionFilter: {
                mask: 2
            },
            label: 'wheel'
        });

        this.frontWheel.setBody({
            type: 'circle',
            radius: this.frontWheel.width / 2
        }, {
            label: 'wheel',
        });

        this.rearWheel = this.matter.add.image(posX - 35,  posY + 45, 'wheel', undefined, {
            friction: 1,
            restitution: 0,
            collisionFilter: {
                mask: 2
            },
            label: 'wheel'
        });

        this.rearWheel.setBody({
            type: 'circle',
            radius: this.rearWheel.width / 2
        }, {
            label: 'wheel',
        });


        this.matter.add.constraint(this.body, this.frontWheel, 40, 1, {
            pointA: {
                x: 70,
                y: 0
            }
        });
        this.matter.add.constraint(this.body, this.frontWheel, 40, 0, {
            pointA: {
                x: 80,
                y: 0
            }
        });
        //
        // // same thing for rear wheel
        this.matter.add.constraint(this.body, this.rearWheel, 40, 0, {
            pointA: {
                x: -70,
                y: 0
            }
        });
        this.matter.add.constraint(this.body, this.rearWheel, 40, 0, {
            pointA: {
                x: -80,
                y: 0
            }
        });
    }



    override update(){

        if(this.isAccelerating){
            // 바퀴회전을 시킨다.
            let velocity = this.frontWheel.body.angularSpeed + this.gameOptions.carAcceleration;
            velocity = Phaser.Math.Clamp(velocity, 0, this.gameOptions.maxCarVelocity);

            // set angular velocity to wheels
            this.matter.body.setAngularVelocity(this.frontWheel.body, velocity);
            this.matter.body.setAngularVelocity(this.rearWheel.body, velocity);
        }
    }


}

