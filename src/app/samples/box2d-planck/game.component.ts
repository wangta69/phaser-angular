// https://www.emanueleferonato.com/wp-content/uploads/2021/04/terrain/terrain.zip
// https://www.emanueleferonato.com/2019/08/10/the-basics-of-infinite-terrain-generation-for-a-horizontal-endless-runner/ 이것도 보면 좋을 듯
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as planck from 'planck';

@Component({
  selector: 'app-root',
  template:`<div id = "thegame"></div>`
})
export class Box2dGameComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 600,
            height: 600
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
    private gameOptions = {
        startTerrainHeight: 0.5,
        amplitude: 300,
        slopeLength: [100, 350],
        // slopeLength: [1000, 1000],
        worldScale: 30
    }

    private canvas: any;
    private worldScale!: number;
    private world: any;
    private tick = 0;

    constructor() {
        super({
            key: 'PlayGame',
        });
    }

    public preload()  {
        this.canvas = this.sys.game.canvas;

    }

    public create()  {
        // Box2D works with meters. We need to convert meters to pixels.
        // let's say 30 pixels = 1 meter.
        this.worldScale = 30;

        // world gravity, as a Vec2 object. It's just a x, y vector
        const gravity = planck.Vec2(0, 3);

        // this is how we create a Box2D world
        this.world = planck.World(gravity);

        // createBox is a method I wrote to create a box, see how it works at line 55
        this.createBox(this.canvas.width / 3, this.canvas.height - 20, this.canvas.width, 40, false);

        // the rest of the script just creates a random box each 500ms, then restarts after 100 iterations
        this.tick = 0;
        this.time.addEvent({
            delay: 500,
            callbackScope: this,
            callback: () => {
                this.createBox(Phaser.Math.Between(100, this.canvas.width - 100), -100, Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80), true);
                this.tick ++;
                // if(this.tick == 100){
                //     this.scene.start("PlayGame");
                // }
            },
            loop: true
        });
    }


    // here we go with some Box2D stuff
    // arguments: x, y coordinates of the center, with and height of the box, in pixels
    // we'll conver pixels to meters inside the method
    private createBox(posX: number, posY: number, width: number, height: number, isDynamic: boolean){

        // this is how we create a generic Box2D body
        const box = this.world.createBody();
        if(isDynamic){

            // Box2D bodies born as static bodies, but we can make them dynamic
            box.setDynamic();
        }

        // a body can have one or more fixtures. This is how we create a box fixture inside a body
        box.createFixture(planck.Box(width / 2 / this.worldScale, height / 2 / this.worldScale));

        // now we place the body in the world
        box.setPosition(planck.Vec2(posX / this.worldScale, posY / this.worldScale));

        // time to set mass information
        box.setMassData({
            mass: 1,
            center: planck.Vec2(),

            // I have to say I do not know the meaning of this "I", but if you set it to zero, bodies won't rotate
            I: 1
        });

        // now we create a graphics object representing the body
        const color = new Phaser.Display.Color();
        color.random();
        color.brighten(50).saturate(100);
        const userData = this.add.graphics();
        userData.fillStyle(color.color, 1);
        userData.fillRect(- width / 2, - height / 2, width, height);

        // a body can have anything in its user data, normally it's used to store its sprite
        box.setUserData(userData);
    }

    override update() {
        // advance the simulation by 1/20 seconds
       this.world.step(1 / 30);

       // crearForces  method should be added at the end on each step
       this.world.clearForces();

       // iterate through all bodies
       for (let b = this.world.getBodyList(); b; b = b.getNext()){

           // get body position
           const bodyPosition = b.getPosition();

           // get body angle, in radians
           const bodyAngle = b.getAngle();

           // get body user data, the graphics object
           const userData = b.getUserData();

           // adjust graphic object position and rotation
           userData.x = bodyPosition.x * this.worldScale;
           userData.y = bodyPosition.y * this.worldScale;
           userData.rotation = bodyAngle;
       }
    }
}

