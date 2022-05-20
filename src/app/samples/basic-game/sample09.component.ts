import { Component } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})

export class BasicGameComponent9 {
    private config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        }
    }

    constructor() {
        const game = new Phaser.Game(this.config);
        game.scene.add('main', new MyScene(), true);
    }
}

export class MyScene extends Phaser.Scene {
    private platforms: any;
    private player: any;
    private cursors: any;
    private stars: any;
    private bombs: any;

    private score = 0;
    private scoreText: any;

    private gameOver = false;

    constructor() {
        super({});
    }

    private preload ()
    {
        this.load.baseURL = 'assets/images/study1/';
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    private create ()
    {

        const self = this;

        // add sky
        this.add.image(400, 300, 'sky');

        // add physics
        this.platforms = this.physics.add.staticGroup();

        // add ground to physics
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        // add collider to player and platforms
        this.physics.add.collider(this.player, this.platforms);

        // add cursor
        this.cursors = this.input.keyboard.createCursorKeys();

        // add stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate( (child: any) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platforms);

        // this.physics.add.overlap(this.player, this.stars, this.collectStar);
        this.physics.add.overlap(this.player, this.stars, (player: any, star: any) => {
            this.collectStar(star);
        });

        // add score
        // this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px' });
        this.scoreText.setFill('#000');

        // add bomb
        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.collider(this.player, this.bombs, (player: any, bomb: any)=>{
            this.hitBomb(player);
        });
    }

    override update ()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    private collectStar (star: any)
    {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate( (child: any) => {

                child.enableBody(true, child.x, 0, true, true);

            });

            const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    private hitBomb (player: any)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.gameOver = true;
    }
}