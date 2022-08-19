import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class AngleComponent implements AfterViewInit {
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

    private ball1: any;
    private ball2: any;
    private g: any;
    private text1: any;
    private text2: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.load.image('cannonBall','/assets/images/pirate/cannonBall.png');
    }

    public create()  {
        //Create image using setOrigin


        this.g = this.add.graphics();


        this.ball1 = this.physics.add.sprite(200, 100,'cannonBall');

        //cannonball creation according to the cannon
        this.ball2 = this.physics.add.sprite(300, 100,'cannonBall')
        .setInteractive({ draggable: true })
        .on('dragstart', (pointer: any, dragX: number, dragY: number) => {
            // ...The x coordinate where the Pointer is currently dragging the Game Object, in world space.
        })
        .on('drag', (pointer: any, dragX: number, dragY: number) => {
            // The x coordinate where the Pointer is currently dragging the Game Object, in world space.
            this.ball2.setPosition(dragX, dragY);
            this.calAngle();

        })
        .on('dragend', (pointer: any, dragX: number, dragY: number, dropped: boolean) => {
            // ...
        });

        this.drawLayOut();
        this.text1 = this.add.text(100, 30, '');
        this.text2 = this.add.text(100, 50, '');


        // const t = - 130;
        for (let i = 500; i > -500; i = i - 10) {
            const angle = i * (Math.PI / 180);
            const rad = angle * (Math.PI / 180);
            console.log(i, ':', angle, ':', rad);
        }
    }

    private drawLayOut() {
        const g = this.add.graphics();
        g.lineStyle(2, 0xffffff, 1);
        g.beginPath();
        g.moveTo(this.ball1.x, this.ball1.y);
        g.lineTo(this.ball1.x + 300, this.ball1.y);

        g.moveTo(this.ball1.x, this.ball1.y);
        g.lineTo(this.ball1.x, this.ball1.y + 300);
        g.strokePath();
    }

    private calAngle() {
        const rad = Math.atan2(this.ball2.y - this.ball1.y,  this.ball2.x - this.ball1.x); // -180 ~ 180 // javascript 방식
        const rad1 = Phaser.Math.Angle.Between(this.ball1.x, this.ball1.y, this.ball2.x, this.ball2.y); // phaser 방식
        // const tanrad = Math.atan(this.ball2.y - this.ball1.y,  this.ball2.x - this.ball1.x);
        const degree = (rad * 180) / Math.PI;
    	// return (rad * 180) / Math.PI;
        console.log('rad:', rad, 'rad1', rad1, degree);

        this.g.clear();

        this.g.lineStyle(2, 0x00ffff, 1);
        this.g.beginPath();
        this.g.moveTo(this.ball1.x, this.ball1.y);
        this.g.lineTo(this.ball2.x, this.ball2.y);
        this.g.strokePath();

        // this.add.text(500, 50, 'rad: ' + rad + ', degree: ' + degree);
        this.g.beginPath();
        // this.g.arc(this.ball1.x, this.ball1.y, 50, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(degree), true);
        // arc (x, y, radius, startAngle, endAngle, anticlockwise)
        this.g.arc(this.ball1.x, this.ball1.y, 50, Phaser.Math.DegToRad(degree),  Phaser.Math.DegToRad(0), true);

        this.g.strokePath();

        this.text1.setText('rad: ' + parseFloat(rad.toString()).toFixed(3) + ', degree: ' + parseFloat(degree.toString()).toFixed(3) + ', degree(1):' + parseFloat(((360 - degree) % 360).toString()).toFixed(3) + ', degree(2):' + parseFloat((-degree).toString()).toFixed(3));

        const dist = Math.sqrt( Math.pow((this.ball1.x-this.ball2.x), 2) + Math.pow((this.ball1.y-this.ball2.y), 2) );

        this.text2.setText('distance: ' + parseFloat(dist.toString()).toFixed(3) );
        // console.
        // this.add.line(0,0,100,100, 100, 200,0xff0000)
        // console.log('add Line');


    }

    // 업데이트될 정보를 입력
    override update()  {


    }





}

