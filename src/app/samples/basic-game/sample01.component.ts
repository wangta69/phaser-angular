import { Component } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})

export class BasicGameComponent1 extends Phaser.Scene {

    private config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: this.preload,
            create: this.create,
            update: this.update
        }
    }

    constructor() {
        super({});
        this.game = new Phaser.Game(this.config);
    }


    private preload ()
    {
        console.log('preload start');
    }

    private create ()
    {
        console.log('create start');
    }

    override update ()
    {
        console.log('update start');
    }

}
