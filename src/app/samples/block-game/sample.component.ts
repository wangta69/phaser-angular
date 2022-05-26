// https://stackabuse.com/introduction-to-phaser-3-building-breakout/
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})

export class Bricks implements OnInit {
    public readonly gameConfig = {
        type: Phaser.AUTO,
        width: 480, // 480
        height: 320, // 320
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
        this.game.scene.add('main', new MyScene(), true);
    }

}

export class MyScene extends Phaser.Scene {
    // Phaser >> Physics >> Arcade >> Sprite >> Body
    // private ball!: Phaser.Physics.Arcade.Sprite;
    // private paddle!: Phaser.Physics.Arcade.Sprite;
    //
    // private bricks!:Phaser.Physics.Arcade.Group;
    // scoreText!:  Phaser.GameObjects.Text;

    private ball: any;
    private paddle: any;

    private bricks: any;
    private brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 3,
            col: 7
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };

    // score
    private scoreText!: any;
    private score:number  =  0;
    // life
    private lives:number  =  3;
    private livesText!:Phaser.GameObjects.Text;
    private lifeLostText!:Phaser.GameObjects.Text;

    // play button 추가
    private playing = false;
    private startButton!:Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.load.crossOrigin = 'anonymous';
        this.load.baseURL = '/';
        // this.load.image('ball', 'img/ball.png');
        this.load.spritesheet('ball', 'assets/images/wobble.png', { frameWidth: 20, frameHeight: 20 });
        this.load.image('paddle', 'assets/images/paddle.png');
        this.load.image('brick',  'assets/images/brick.png');

        // 시작 버튼 추가
        this.load.spritesheet('button', 'assets/images/button.png', { frameWidth: 120, frameHeight: 40 });

    }

    public create()  {
        // this.ball = this.add.sprite(50, 50, 'ball');
        // 물리법칙 적용
        this.ball = this.physics.add.sprite(50, 250, 'ball'); // x, y, texture

        this.anims.create({
            key: 'wobble',
            frames: this.anims.generateFrameNumbers('ball', { frames: [0, 1, 0, 2, 0, 1, 0, 2, 0]}),
            frameRate : 24,
        });

        //  brick 추가
        this.initBricks(); // brick 추가

        // 중력추가
        // this.ball.body.velocity.set(150,  150);
        // this.ball.body.velocity.set(150, -250);

        this.ball.setPosition(this.cameras.main.width * 0.5, this.cameras.main.height - 25);
        this.ball.body.velocity.set(0, 0);
        this.ball.body.allowGravity = false;

        // this.ball.body.immovable = true; //  벽돌과 충돌후에도 직직한다.
        // 바운드에 충돌 추가
        this.ball.body.collideWorldBounds = true;
        // 충돌후 바운스 추가
        this.ball.body.bounce.set(1);
        // this.ball = this.game.add.sprite(this.cameras.main.width*0.5, this.cameras.main.height-25, 'ball');

        // paddle 추가
        this.paddle = this.physics.add.sprite(this.cameras.main.width * 0.5, this.cameras.main.height - 5, 'paddle');
        // 공과 paddle에 충돌 인자 추가
        this.physics.add.collider(this.ball, this.paddle, () => { // ball:Phaser.GameObjects.GameObject, paddle:Phaser.GameObjects.GameObject
            this.ball.setVelocityX((-1 * 5 * (this.paddle.x - this.ball.x))); // 공의 바운스 변경 (x축의 속도에 변화를 준다)
            this.ball.anims.play('wobble');
        });
        // 패들이 움직이지 않도록 설정하기
        this.paddle.body.allowGravity = false;
        this.paddle.body.immovable = true;

        // ball & worldbound setting
        this.physics.world.checkCollision.down = true;
        this.ball.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body: any, blockedUp: boolean, blockedDown: boolean, blockedLeft: boolean, blockedRight: boolean) => {

            if (blockedDown == true) {
                this.fnBallLeaveScreen();
            }
        });

        // 벽돌에 충둥감지
        // this.physics.add.collider(this.ball,  this.bricks,  this.fnBallHitBrick);
        this.physics.add.collider(this.ball,  this.bricks,  (ball:Phaser.GameObjects.GameObject, brick:Phaser.GameObjects.GameObject) => {
            // brick.destroy();
            this.add.tween({
                targets : brick,
                scaleX: 0.5,
                scaleY: 0.5,
                ease: 'linear',
                duration : 200,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                    brick.destroy();
                },
                onCompleteScope: this
            });

            this.ball.anims.play('wobble');
            this.score += 10;
            this.scoreText.setText('Points: ' + this.score);

            if (this.bricks.countActive(true)  ==  0) {
                alert('You won the game, congratulations!');
                location.reload();
             }
        });

        // 점수판 생성
        this.scoreText = this.add.text(5, 5, 'Points: 0', { font: '18px Arial'}); // , fill: '#0095DD'
        // this.scoreText.font = 'Arial';
        // this.scoreText.fontSize = '50p[t]';
        // this.scoreText.fill = '#0095DD';
        // this.scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        // Life 생성
        this.livesText = this.add.text(this.cameras.main.width - 50, 5, 'Lives: ' + this.lives, { font: '18px Arial' }); // , fill: '#0095DD'
        this.livesText.setOrigin(1,0);
        this.lifeLostText = this.add.text(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'Life lost, click to continue', { font: '18px Arial' }); // , fill: '#0095DD'
        this.lifeLostText.setOrigin(0.5, 0.5);
        this.lifeLostText.visible = false;

        // 시작버튼 추가
        this.startButton = this.add.sprite(this.cameras.main.width * 0.5, this.cameras.main.height * 0.5, 'button', ).setInteractive();
        this.startButton.setOrigin(0.5,0.5);

        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1);
        });

        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0);
        });

        this.startButton.once('pointerdown', () => {
            this.startButton.setFrame(2);
            this.startButton.destroy();
            this.ball.body.velocity.set(150, -250);
            this.playing = true;
            this.ball.body.allowGravity =  true;
        })



    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        this.paddle.x =  this.game.input.activePointer.x ||  this.cameras.main.width * 0.5;
    }

    /**
     * brick을 생성한다.
     */
    private initBricks() {
        // this.load.image('brick',  'assets/images/brick.png');
        this.bricks = this.physics.add.group({allowGravity: false, immovable: true});

        for (let c = 0; c < this.brickInfo.count.col; c++) {
            for (let r = 0; r < this.brickInfo.count.row; r++) {
                const brickX = (c * (this.brickInfo.width + this.brickInfo.padding)) + this.brickInfo.offset.left;
                const brickY = (r * (this.brickInfo.height + this.brickInfo.padding)) + this.brickInfo.offset.top;
                this.bricks.create(brickX, brickY, 'brick');
            }
        }

        console.log('initBricks >> this.bricks >>', this.bricks );
    }

    private fnBallLeaveScreen() {
        this.lives--;
        if(this.lives) {
            this.livesText.setText('Lives: '+this.lives);
            this.lifeLostText.visible = true;
            this.ball.setPosition(this.cameras.main.width * 0.5, this.cameras.main.height-25);
            this.paddle.setPosition(this.cameras.main.width * 0.5, this.cameras.main.height-5);
            this.ball.body.velocity.set(0, 0);
            this.ball.body.allowGravity = false;

            this.input.once('pointerdown', () => { // pointer: any
                this.lifeLostText.visible = false;
                this.ball.body.velocity.set(150, -250);
                this.ball.body.allowGravity = true;
            });
        } else {
            alert('You lost, game over!');
            // location.reload();
        }
    }


}
