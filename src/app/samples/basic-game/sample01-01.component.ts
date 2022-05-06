import { Component } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})

export class BasicGameComponent1 {
    // public game: any;

    private config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600
    }


    constructor() {
        const game = new Phaser.Game(this.config);
        game.scene.add('main', new MyScene(), true);
    }
}

export class MyScene extends Phaser.Scene {
    constructor() {
        super({});
    }

    private preload ()
    {

    }

    private create ()
    {
    }

    override update ()
    {
    }
}