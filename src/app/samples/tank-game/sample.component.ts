// https://stackabuse.com/introduction-to-phaser-3-building-breakout/
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import { TankObj } from './tank';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  template:``
})

export class Tank implements OnInit {
    public readonly gameConfig = {
        type: Phaser.AUTO,
        width: 760, // 480
        height: 640, // 320
        backgroundColor : '#71c5cf',
        physics: {
            default : 'arcade',
            arcade: {
                debug: false, // true 시 물리적 바운드 및 방향성 표시
                setBounds: false
            }
        },
        // parent: null,
        callbacks: {
            postBoot: function(game: any) { // 상기 width, height에 초기 설정 및 이미지를 설정후 아래처럼  스케일을 변경한다.
                game.canvas.style.width = '100%';
                game.canvas.style.height = '100%';
            }
        }
    }

    private game: any;
    constructor() {

    }

    ngOnInit() {
        this.game = new Phaser.Game(this.gameConfig);
        this.game.scene.add('main', new Main(), true);
    }

}

export class Main extends Phaser.Scene {
    // Phaser >> Physics >> Arcade >> Sprite >> Body
    // private ball!: Phaser.Physics.Arcade.Sprite;
    // private paddle!: Phaser.Physics.Arcade.Sprite;
    //
    // private bricks!:Phaser.Physics.Arcade.Group;
    // scoreText!:  Phaser.GameObjects.Text;

    private tanks: any = [];



    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.load.crossOrigin = 'anonymous';
        this.load.baseURL = '/assets/images/tank/';
        // this.load.image('ball', 'img/ball.png');
        this.load.image('blue-tank', 'blue.png');
        this.load.image('green-tank', 'green.png');
        this.load.image('red-tank', 'red.png');
        this.load.image('yellow-tank', 'yellow.png');
    }

    public create()  {

        const tankcolorss = ['blue-tank', 'green-tank', 'red-tank', 'yellow-tank'];

        _.each(tankcolorss, (name) => {
            const tank = new TankObj(this, name);
            this.tanks.push(tank);
        });

        // this.physics.moveToObject(object1, object2, 200); miliscond, 200 = 0.2
        // // object1을 object 2쪽으로 이동시키기
        // this.tanks[0].tank.setVelocityX(10)
        // this.tanks[0].tank.setVelocityY(10)
    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update', this.tanks[0].tank);
        this.tanks[0].tank.x = 100;
        this.tanks[0].tank.y = 100;
        this.tanks[1].tank.x = 150;
        this.tanks[1].tank.y = 150;
        this.tanks[2].tank.x = 200;
        this.tanks[2].tank.y = 200;
        this.tanks[3].tank.x = 250;
        this.tanks[3].tank.y = 250;
    }

    /**
     * brick을 생성한다.
     */
    // private initBricks() {
    //     // this.load.image('brick',  'assets/images/brick.png');
    //     this.bricks = this.physics.add.group({allowGravity: false, immovable: true});
    //
    //     for (let c = 0; c < this.brickInfo.count.col; c++) {
    //         for (let r = 0; r < this.brickInfo.count.row; r++) {
    //             const brickX = (c * (this.brickInfo.width + this.brickInfo.padding)) + this.brickInfo.offset.left;
    //             const brickY = (r * (this.brickInfo.height + this.brickInfo.padding)) + this.brickInfo.offset.top;
    //             this.bricks.create(brickX, brickY, 'brick');
    //         }
    //     }
    //
    //     console.log('initBricks >> this.bricks >>', this.bricks );
    // }
    //
    // private fnBallLeaveScreen() {
    //     this.lives--;
    //     if(this.lives) {
    //         this.livesText.setText('Lives: '+this.lives);
    //         this.lifeLostText.visible = true;
    //         this.ball.setPosition(this.cameras.main.width * 0.5, this.cameras.main.height-25);
    //         this.paddle.setPosition(this.cameras.main.width * 0.5, this.cameras.main.height-5);
    //         this.ball.body.velocity.set(0, 0);
    //         this.ball.body.allowGravity = false;
    //
    //         this.input.once('pointerdown', () => { // pointer: any
    //             this.lifeLostText.visible = false;
    //             this.ball.body.velocity.set(150, -250);
    //             this.ball.body.allowGravity = true;
    //         });
    //     } else {
    //         alert('You lost, game over!');
    //         // location.reload();
    //     }
    // }


}
