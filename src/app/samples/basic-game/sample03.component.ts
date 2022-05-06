import { Component } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})

export class BasicGameComponent3{
    // public game: any;

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
        this.add.image(400, 300, 'sky');
        // this.add.image(0, 0, 'sky').setOrigin(0, 0)
        this.platforms = this.physics.add.staticGroup();

        // this.platforms.create(400, 568, 'ground');

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    }

    override update ()
    {
        console.log('update start');
    }

}
