// https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Matter.html#.MatterBodyConfig
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
@Component({
  selector: 'app-root',
  template:`<div id = "thegame"></div>`
})
export class StaticComponent implements AfterViewInit {
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
    }

    public create()  {



        this.addGround();
        // method to add the car, arguments represent x and y position
        // this.addCar(250, this.canvas.height / 2 - 70);
        this.addBall();


    }

    private addGround() {
        // create a new rectangle body
        this.matter.add.rectangle(0, 400, 2000, 10, {
            isStatic: true,
            angle: 0.1,
            friction: 1,
            restitution: 0,
            label: 'ground'
        });
    }

    // method to build the car
    private addBall(){
        this.frontWheel = this.matter.add.circle(35, 25, 30, {
            friction: 1,
            restitution: 0,
            label: 'wheel'
        });

        console.log('this.frontWheel >>', this.frontWheel);
    }



    override update(){


    }


}

