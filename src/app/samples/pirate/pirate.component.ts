import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class PirateComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      type: Phaser.AUTO,
      width: 768,
      height: 512,
      physics: {
        default : 'arcade',
        arcade: {
           debug: true,
  		    setBounds: true
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
    private cannon: any;
    private cannonball: any;
    private pirateship: any;

    private mouse: any;


    private control = false;

    private worldBounds: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {

        this.load.image('background','/assets/images/pirate/background.png');
        this.load.image('cannon','/assets/images/pirate/cannon.png');
        this.load.image('cannonBall','/assets/images/pirate/cannonBall.png');
        this.load.image('pirateShip','/assets/images/pirate/pirateShip.png');
    }

    public create()  {
        //Create image using setOrigin
        this.add.image(0,0,'background').setOrigin(0,0);

        //cannon creation according to the ship in the background
        this.cannon = this.physics.add.sprite(384, 256,'cannon');
        //cannonball creation according to the cannon
        this.cannonball = this.physics.add.sprite(384, 256,'cannonBall');

        //create pirate ship
        this.pirateship = this.physics.add.group();
        this.pirateship.create(100,100,'pirateShip');
        this.pirateship.create(600,100,'pirateShip');
        this.pirateship.create(100,400,'pirateShip');
        this.pirateship.create(600,400,'pirateShip');

        //for mouse click event
        this.mouse = this.input.mousePointer;
        //for mouse position
        // input=this.input;

        //set game bounds
        this.worldBounds=this.physics.world.bounds;
    }

    // 업데이트될 정보를 입력
    override update()  {

        console.log(this.input);
        //angle between mouse and ball
       const angle = Phaser.Math.Angle.Between(
           this.cannon.x,
           this.cannon.y,
           this.input.x,
           this.input.y
       );
       //rotation cannon with PI/2 == 90
       this.cannon.setRotation(angle + Math.PI / 2);

       //mouse clicked
       if(this.mouse.isDown && this.control == false){
           //for fire again
           this.cannonball = this.physics.add.sprite(384, 256, 'cannonBall');
           //move to mouse position
           this.physics.moveTo(this.cannonball, this.input.x, this.input.y, 500);
           this.control = true;
       }

       //check world bounds
       if(this.cannonball.x > this.worldBounds.width || this.cannonball.y > this.worldBounds.height || this.cannonball.x < 0 || this.cannonball.y < 0){
           this.control = false;
       }

       //for collision
       // this.physics.add.collider(this.cannonball, this.pirateship, (cannonball: any, pirateship: any) => {this.destroy(cannonball, pirateship)});

        this.physics.add.overlap(this.cannonball, this.pirateship, (cannonball: any, pirateship: any) => {this.destroy(cannonball, pirateship)});
    }

    //collide cannonbal and pirateShip
    private destroy(cannonball: any, pirateship: any) {
            pirateship.disableBody(true, true);
            cannonball.disableBody(true, true);
            this.control = false;
    }



}

