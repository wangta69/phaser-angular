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
export class RiskyGame1Component implements AfterViewInit {
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
    private gameOptions = {
        // start vertical point of the terrain, 0 = very top; 1 = very bottom
        startTerrainHeight: 0.5,
        // max slope amplitude, in pixels
        amplitude: 100,
        // slope length range, in pixels
        slopeLength: [150, 350],
        // a mountain is a a group of slopes.
        mountainsAmount: 3,
        // amount of slopes for each mountain
        slopesPerMountain: 6,
        // car acceleration
        carAcceleration: 0.01,
        // maximum car velocity
        maxCarVelocity: 1,
        // rocks ratio, in %
        rocksRatio: 5
    }

    private canvas: any;
    private bodyPool: any = []; // = new Phaser.Math.Vector2(0, Math.random());
    private rocksPool: any = [];

    private mountainGraphics: any = [];
    private mountainStart: any;
    private isAccelerating!: boolean;
    private flyingText: any;
    private flyingTime!: number;
    private wheelsColliding!: boolean;

    private body: any;
    private diamond: any;
    private frontWheel: any;
    private rearWheel: any;

    constructor() {
        super({
            key: 'PlayGame',
        });
    }

    public preload()  {
        this.canvas = this.sys.game.canvas;

    }

    public create()  {
        // creation of pool arrays
        this.bodyPool = [];
        this.rocksPool = [];

        // array to store mountains
        this.mountainGraphics = [];

        // mountain start coordinates
        this.mountainStart = new Phaser.Math.Vector2(0, 0);

        // loop through all mountains
        for(let i = 0; i < this.gameOptions.mountainsAmount; i++){

            // each mountain is a graphics object
            this.mountainGraphics[i] = this.add.graphics();

           // generateTerrain is the method to generate the terrain. The arguments are the graphics object and the start position
           this.mountainStart = this.generateTerrain(this.mountainGraphics[i], this.mountainStart);
       }

       // method to add the car, arguments represent x and y position
      this.addCar(250, this.canvas.height / 2 - 70);

       // the car is not accelerating
       this.isAccelerating = false;

       // input management
       this.input.on('pointerdown', this.accelerate, this);
       this.input.on('pointerup', this.decelerate, this);

       // collision check between the diamond and the car. Any other diamond collision is not allowed
       this.matter.world.on('collisionstart', (event: any, bodyA: any, bodyB: any) => {
           if((bodyA.label == 'diamond' && bodyB.label != 'car') || (bodyB.label == 'diamond' && bodyA.label != 'car')){
               this.scene.start('PlayGame')
           }
       });

       // a text to show when we are flying
       this.flyingText = this.add.text(100, 100, 'FLYING!!', {
           fontFamily: 'Arial',
           fontSize: '128',
           color: '#FF8800'
       });

       this.flyingText.setVisible(false);

       // variable to count the time flying
       this.flyingTime = 0;

       // this event will check all active collisions
       this.matter.world.on('collisionactive', (e: any) => {
           // no wheels colliding
           this.wheelsColliding = false;
           // a collision made by a pair of bodies
           e.pairs.forEach((p: any) =>{
               // if a colliding body's label is 'wheel'...
               if(p.bodyA.label === 'wheel' || p.bodyB.label === 'wheel'){
                   // at least a wheel is colliding
                   this.wheelsColliding = true;
               }
           })
       })
    }

    private generateTerrain(graphics: any, mountainStart: any) {

        // place graphics object
        graphics.x = mountainStart.x;

        // draw the ground
        graphics.clear();

        // array to store slope points
        let slopePoints = [];

        // variable to count the amount of slopes
        let slopes = 0;

        // slope start point
        let slopeStart = new Phaser.Math.Vector2(0, mountainStart.y);

        // set a random slope length
        let slopeLength = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]);

        // determine slope end point, with an exception if this is the first slope of the fist mountain: we want it to be flat
        let slopeEnd = (mountainStart.x == 0) ? new Phaser.Math.Vector2(slopeStart.x + this.gameOptions.slopeLength[1] * 1.5, 0) : new Phaser.Math.Vector2(slopeStart.x + slopeLength, Math.random());

        // current horizontal point
        let pointX = 0;

        // while we have less slopes than regular slopes amount per mountain...
        while(slopes < this.gameOptions.slopesPerMountain){

            // slope interpolation value
            let interpolationVal = this.interpolate(slopeStart.y, slopeEnd.y, (pointX - slopeStart.x) / (slopeEnd.x - slopeStart.x));

            // if current point is at the end of the slope...
            if(pointX == slopeEnd.x){

                // increase slopes amount
                slopes ++;

                // next slope start position
                slopeStart = new Phaser.Math.Vector2(pointX, slopeEnd.y);

                // next slope end position
                slopeEnd = new Phaser.Math.Vector2(slopeEnd.x + Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]), Math.random());

                // no need to interpolate, we use slope start y value
                interpolationVal = slopeStart.y;
            }

            // current vertical point
            let pointY = this.canvas.height * this.gameOptions.startTerrainHeight + interpolationVal * this.gameOptions.amplitude;

            // add new point to slopePoints array
            slopePoints.push(new Phaser.Math.Vector2(pointX, pointY));

            // move on to next point
            pointX ++ ;
        }

        // simplify the slope
        let simpleSlope = simplify(slopePoints, 1, true);

        // loop through all simpleSlope points starting from the second
        for(let i = 1; i < simpleSlope.length; i++){

            // define a line between previous and current simpleSlope points
            let line = new Phaser.Geom.Line(simpleSlope[i - 1].x, simpleSlope[i - 1].y, simpleSlope[i].x, simpleSlope[i].y);

            // calculate line length, which is the distance between the two points
            let distance = Phaser.Geom.Line.Length(line);

            // calculate the center of the line
            let center = Phaser.Geom.Line.GetPoint(line, 0.5);

            // calculate line angle
            let angle = Phaser.Geom.Line.Angle(line);

            // if the pool is empty...
            if(this.bodyPool.length == 0){

                // create a new rectangle body
                let body: any = this.matter.add.rectangle(center.x + mountainStart.x, center.y, distance, 10, {
                    isStatic: true,
                    angle: angle,
                    friction: 1,
                    restitution: 0,
                    collisionFilter: {
                        category: 2
                    },
                    label: 'ground'
                });

                // assign inPool property to check if the body is in the pool
                body.inPool = false;

            } else { // if the pool is not empty...

                // get the body from the pool
                let body = this.bodyPool.shift();

                // change inPool property
                body.inPool = false;

                // reset, reshape and move the body to its new position
                this.matter.body.setPosition(body, {
                    x: center.x + mountainStart.x,
                    y: center.y
                });
                let length = body.area / 10;
                this.matter.body.setAngle(body, 0)
                this.matter.body.scale(body, 1 / length, 1);
                this.matter.body.scale(body, distance, 1);
                this.matter.body.setAngle(body, angle);
            }

            // should we add a rock?
            if(Phaser.Math.Between(0, 100) < this.gameOptions.rocksRatio && (mountainStart.x > 0 || i != 1)){

                // random rock position
                let size = Phaser.Math.Between(20, 30)
                let depth = Phaser.Math.Between(0, size / 2)
                let rockX = center.x + mountainStart.x + depth * Math.cos(angle + Math.PI / 2);
                let rockY = center.y + depth * Math.sin(angle + Math.PI / 2);

                // draw the rock
                graphics.fillStyle(0x6b6b6b, 1);
                graphics.fillCircle(rockX - mountainStart.x, rockY, size);

                // if the pool is empty...
                if (this.rocksPool.length === 0) {

                    // create a new circle body
                    const rock: any = this.matter.add.circle(rockX, rockY, size, {
                        isStatic: true,
                        angle: angle,
                        friction: 1,
                        restitution: 0,
                        collisionFilter: {
                            category: 2
                        },
                        label: 'rock'
                    });

                    // assign inPool property to check if the body is in the pool
                    rock.inPool = false;
                } else {

                    // get the rock from the pool
                    const rock = this.rocksPool.shift();

                    // resize the rock
                    this.matter.body.scale(rock, size / rock.circleRadius, size / rock.circleRadius);

                    // move the rock to its new position
                    this.matter.body.setPosition(rock, {
                        x: rockX,
                        y: rockY
                    });
                    rock.inPool = false;
                }
            }
        }

        // draw the slopes
        graphics.moveTo(0, this.canvas.height * 2);
        graphics.fillStyle(0x654b35);
        graphics.beginPath();
        simpleSlope.forEach((point: any) => {
            graphics.lineTo(point.x, point.y);
        })
        graphics.lineTo(pointX, this.canvas.height * 2);
        graphics.lineTo(0, this.canvas.height * 2);
        graphics.closePath();
        graphics.fillPath();

        // draw the grass
        graphics.lineStyle(16, 0x6b9b1e);
        graphics.beginPath();
        simpleSlope.forEach(function(point){
            graphics.lineTo(point.x, point.y);
        })
        graphics.strokePath();

        // assign a custom 'width' property to the graphics object
        graphics.width = pointX - 1

        // return the coordinates of last mountain point
        return new Phaser.Math.Vector2(graphics.x + pointX - 1, slopeStart.y);
    }

    // method to build the car
    private addCar(posX: number, posY: number){
        // car is made by three rectangle bodies which will be merged into a compound object
        const floor = (Phaser.Physics.Matter as any).Matter.Bodies.rectangle(posX, posY, 100, 10, {
            label: 'car'
        });

        const rightBarrier = (Phaser.Physics.Matter as any).Matter.Bodies.rectangle(posX + 45, posY - 15, 10, 20, {
            label: 'car'
        });
        const leftBarrier = (Phaser.Physics.Matter as any).Matter.Bodies.rectangle(posX - 45, posY - 15, 10, 20, {
            label: 'car'
        });

        // this is how we create the compound object
        this.body = (Phaser.Physics.Matter as any).Matter.Body.create({

            // array of single bodies
            parts: [floor, leftBarrier, rightBarrier],
            friction: 1,
            restitution: 0
        });

        // add the body to the world
        this.matter.world.add(this.body);

        // the diamond. It cannot fall off the car
        // this.diamond = this.matter.add.rectangle(posX, posY - 40, 30, 30, {
        //     friction: 1,
        //     restitution: 0,
        //     label: 'diamond'
        // });



        // add front wheel. A circle
        this.frontWheel = this.matter.add.circle(posX + 35, posY + 25, 30, {
            friction: 1,
            restitution: 0,
            collisionFilter: {
                mask: 2
            },
            label: 'wheel'
        });

        // add rear wheel
        this.rearWheel = this.matter.add.circle(posX - 35, posY + 25, 30, {
            friction: 1,
            restitution: 0,
            collisionFilter: {
                mask: 2
            },
            label: 'wheel'
        });

        // this.matter.world.setBodyRenderStyle(this.diamond, 0xff0000, 1, 5, 0x0000ff, 1)
        this.matter.world.setBodyRenderStyle(this.body, 0xff0000, 1, 5, 0x0000ff, 1)
        this.matter.world.setBodyRenderStyle(this.frontWheel, 0xff0000, 1, 5, 0x0000ff, 1)
        this.matter.world.setBodyRenderStyle(this.rearWheel, 0xff0000, 1, 5, 0x0000ff, 1)
        // these two constraints will bind front wheel to the body
        this.matter.add.constraint(this.body, this.frontWheel, 20, 1, {
            pointA: {
                x: 30,
                y: 0
            }
        });
        this.matter.add.constraint(this.body, this.frontWheel, 20, 0, {
            pointA: {
                x: 45,
                y: 0
            }
        });

        // same thing for rear wheel
        this.matter.add.constraint(this.body, this.rearWheel, 20, 0, {
            pointA: {
                x: -30,
                y: 0
            }
        });
        this.matter.add.constraint(this.body, this.rearWheel, 20, 0, {
            pointA: {
                x: -45,
                y: 0
            }
        });
    }

    // method to accelerate
    private accelerate(){
        this.isAccelerating = true;
    }

    // method to decelerate
    private decelerate(){
        this.isAccelerating = false;
    }

    override update(t: number, dt: number){

        // if wheels aren't colliding...
        if(!this.wheelsColliding){

            // add frame delta time to flying time
            this.flyingTime += dt;

            // we can say the car is flying when it's in the air for more than 0.5 seconds
            if(this.flyingTime > 500){

                // show flying text
                this.flyingText.setVisible(true);
            }
        } else{ // if wheels aren colliding...


            // reset flying time
            this.flyingTime = 0;

            // hide flying text
            this.flyingText.setVisible(false);
        }

        // zoom is calculated according to car speed.
        // zoom = 1: no zoom
        // zoom > 1: zoom in
        // zoom < 1: zoom out
        let zoom = 1 - Phaser.Math.Clamp(this.body.speed, 0, 15) / 25

        // zoomTo method allows the camera to zoom at 'zoom' ratio in 1000 milliseconds
        // the most important argument is the 4th argument.
        // If set to 'false', camera won't adjust its zoom if already zooming.
        this.cameras.main.zoomTo(zoom, 1000, 'Linear', false);

        // make the game follow the car
        this.cameras.main.scrollX = this.body.position.x - this.canvas.width / 4 + this.canvas.width * (1 - this.cameras.main.zoom);
        this.cameras.main.scrollY = this.body.position.y - this.canvas.height / 2.2;

        // flyingText too should follow the car
        this.flyingText.x = 100 + this.cameras.main.scrollX;

        // adjust velocity according to acceleration
        if(this.isAccelerating){
            let velocity = this.frontWheel.angularSpeed + this.gameOptions.carAcceleration;
            velocity = Phaser.Math.Clamp(velocity, 0, this.gameOptions.maxCarVelocity);

            console.log('velocity >>', velocity);
            // set angular velocity to wheels
            this.matter.body.setAngularVelocity(this.frontWheel, velocity);
            this.matter.body.setAngularVelocity(this.rearWheel, velocity);
        }

        // loop through all mountains
        this.mountainGraphics.forEach((item: any) =>{

            // if the mountain leaves the screen to the left...
            if(this.cameras.main.scrollX > item.x + item.width + this.canvas.width){

                // reuse the mountain
                this.mountainStart = this.generateTerrain(item, this.mountainStart)
            }
        });

        // get all bodies
        let bodies = (this.matter.world.localWorld as any).bodies;

        // loop through all bodies
        bodies.forEach((body: any) => {

            // if the body is out of camera view to the left side and is not yet in the pool..
            if(this.cameras.main.scrollX > body.position.x + this.canvas.width && !body.inPool){

                // ...add the body to proper pool
                switch(body.label){
                    case 'ground':
                        this.bodyPool.push(body);
                        break;
                    case 'rock':
                        this.rocksPool.push(body);
                        break;
                }
                body.inPool = true;
            }
        })
    }

    private interpolate(vFrom: number, vTo: number, delta: number) {
        const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
        return vFrom * (1 - interpolation) + vTo * interpolation;
    }

}

