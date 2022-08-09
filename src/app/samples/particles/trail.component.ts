import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class TrailComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor : '#000',
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
      this.game.scene.add('main', new MyScene(), true);
    }

    ngAfterViewInit() {

    }
}

export class MyScene extends Phaser.Scene {
    private player: any;
    private canvas: any;
    private emitter: any;
    // private emitter5: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.canvas = this.sys.game.canvas;
        this.load.image('player', '/assets/images/circular/player.png');
        this.load.image('particle', '/assets/images/circular/particle.png');
    }

    public create()  {
        // this.player = this.add.sprite(game.config.width / 2, game.config.height / 2 - gameOptions.bigCircleRadius - gameOptions.playerRadius, "player");
        // this.player.displayWidth = gameOptions.playerRadius * 2;
        // this.player.displayHeight = gameOptions.playerRadius * 2;

        this.player = this.add.sprite(100, 100, "player");

        this.input.on('pointermove', (e: any) =>{

            this.player.x = e.x;
            this.player.y = e.y;
        });

        // creating a particle system uising 'particle' image
        const particles = this.add.particles('particle');

        // trail emitter configuration
        this.emitter = particles.createEmitter({

            // particle speed - particles do not move
            speed: 0,

            // particle scale: from 1 to zero
            scale: {
                start: 1,
                end: 0
            },

            // particle alpha: from opaque to transparent
            alpha: {
                start: 1,
                end: 0
            },

            // particle frequency: one particle every 100 milliseconds
            frequency: 10,

            // particle lifespan: 1 second
            lifespan: 2000
        });

        // making the emitter follow the player
        this.emitter.startFollow(this.player);

    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        // this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path.draw(this.graphics);
    }



}

