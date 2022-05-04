import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  templateUrl: './sample.component.html',
})
export class SampleComponent1 implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      title: "Phaser Running Test @ Angular",
      version: "0.0.1",
      type: Phaser.AUTO,
      width: 480,
      height: 320,
      backgroundColor : '#71c5cf',
      physics: {
        default : 'arcade',
        arcade: {
          debug: true,
  		setBounds: false
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
    }

    ngAfterViewInit() {

    }
}
