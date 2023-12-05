import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-root',
  template: ``
})
export class CircularGameComponent implements AfterViewInit {
  public readonly gameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    scene: [playGame]
  }

  private game: any;

  constructor() {}

  ngOnInit() {
    this.game = new Phaser.Game(this.gameConfig);
  }

  ngAfterViewInit() {
  }
}

export class playGame extends Phaser.Scene {
  private gameOptions = {
    // radius of the big circle - the 'planet' - in pixels
    bigCircleRadius: 250,
    // radius of the small circle, in pixels
    playerRadius: 25,
    // player speed, in degrees per frame
    playerSpeed: 1,
    // world gravity
    worldGravity: 0.8,
    // jump force. First element is the first jump, second element - if any -  the double jump, third element - if any - the triple jump and so on
    jumpForce: [12, 9, 6],
    // spike size - width, height - in pixels
    spikeSize: [25, 50],
    // distance needed to consider the player close to a spike, in degrees
    closeToSpike: 10,
    // distance needed to consider the player far from a spike, in degrees
    farFromSpike: 35
  }

  private gameOver!: boolean;
  private spikeGroup: any;
  private bigCircle: any;
  private player: any;
  private maskImage: any;
  private emitter: any
  private canvas: any;
  // private emitter5: any;
  constructor() {
    super({
      key: 'PlayGame',
    });
  }

  public preload() {
    this.canvas = this.sys.game.canvas;
    this.load.image('bigcircle', '/assets/images/circular/bigcircle.png'); // 가장 큰 원
    this.load.image('player', '/assets/images/circular/player.png');
    this.load.image('spike', '/assets/images/circular/spike.png');
    this.load.image('mask', '/assets/images/circular/mask.png');
    this.load.image('particle', '/assets/images/circular/particle.png');
  }

  public create() {
    // flag to see if it's game over
    console.log('create........................');
    this.gameOver = false;

    // adding a group which will contain all spikes
    this.spikeGroup = this.add.group();

    // adding the big circle, the 'planet', placed in the middle of the canvas
    this.bigCircle = this.add.sprite(this.canvas.width / 2, this.canvas.height / 2, 'bigcircle');
    this.bigCircle.displayWidth = this.gameOptions.bigCircleRadius * 2;
    this.bigCircle.displayHeight = this.gameOptions.bigCircleRadius * 2;

    // placing the player, just above the top of the 'planet'
    this.player = this.add.sprite(this.canvas.width / 2, this.canvas.height / 2 - this.gameOptions.bigCircleRadius - this.gameOptions.playerRadius, 'player');
    this.player.displayWidth = this.gameOptions.playerRadius * 2;
    this.player.displayHeight = this.gameOptions.playerRadius * 2;

    // a few custom properties: currentAngle is the angle of the player
    this.player.currentAngle = -80;

    // jumpOffset is the amount of pixels to be added to player position when it jumps
    this.player.jumpOffset = 0;

    // how many jumps is the player doing?
    this.player.jumps = 0;

    // current jump force
    this.player.jumpForce = 0;

    // when the player clicks/taps on the canvas...
    this.input.on('pointerdown', (e: any) => {

      // can the player jump?
      if (this.player.jumps < this.gameOptions.jumpForce.length) {
        // player is jumping once more
        this.player.jumps++;
        // adding the proper jump force to player's jumpForce property
        this.player.jumpForce = this.gameOptions.jumpForce[this.player.jumps - 1];
      }
    }, this);

    // we are going to place nine spikes
    for (let i = 0; i < 9; i++) {
      // adding the spike on the canvas
      const spike = this.add.sprite(0, 0, 'spike');
      // set spike origin point to left and horizontal middle
      spike.setOrigin(0, 0.5);
      // adding the spike to spike group
      this.spikeGroup.add(spike);
      // place the spike. Arguments are the spike itself and the quadrant of the big circle
      this.placeSpike(spike, Math.floor(i / 3));
    }

    // adding the mask image which will act like a 'fog' to hide and show spikes
    this.maskImage = this.add.sprite(this.canvas.width / 2, this.canvas.height / 2, 'mask');
    // creating a particle system uising 'particle' image
    const emitter = this.add.particles(0, 0, 'particle', {
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
      frequency: 100,
      // particle lifespan: 1 second
      lifespan: 1000
    });
    emitter.startFollow(this.player);
  }

  // method to randomly place a spike into a quadrant
  private placeSpike(spike: any, quadrant: any) {

    // choosing a random angle
    const randomAngle = Phaser.Math.Angle.WrapDegrees(Phaser.Math.Between(quadrant * 90, (quadrant + 1) * 90));

    // this is the same random angle converted in radians
    const randomAngleRadians = Phaser.Math.DegToRad(randomAngle);

    // determining spike position according to its angle
    const spikeX = this.bigCircle.x + (this.gameOptions.bigCircleRadius - Phaser.Math.Between(4, 25)) * Math.cos(randomAngleRadians);
    const spikeY = this.bigCircle.y + (this.gameOptions.bigCircleRadius - Phaser.Math.Between(4, 25)) * Math.sin(randomAngleRadians);
    spike.x = spikeX;
    spike.y = spikeY;

    // saving spike's quadrant in a custom property
    spike.quadrant = quadrant;

    // setting spike angke
    spike.angle = randomAngle;

    // saving the three spike vertices in custom properties
    spike.top = new Phaser.Math.Vector2(spikeX + this.gameOptions.spikeSize[1] * Math.cos(randomAngleRadians), spikeY + this.gameOptions.spikeSize[1] * Math.sin(randomAngleRadians));
    spike.base1 = new Phaser.Math.Vector2(spikeX + this.gameOptions.spikeSize[0] / 2 * Math.cos(randomAngleRadians + Math.PI / 2), spikeY + this.gameOptions.spikeSize[0] / 2 * Math.sin(randomAngleRadians + Math.PI / 2));
    spike.base2 = new Phaser.Math.Vector2(spikeX + this.gameOptions.spikeSize[0] / 2 * Math.cos(randomAngleRadians - Math.PI / 2), spikeY + this.gameOptions.spikeSize[0] / 2 * Math.sin(randomAngleRadians - Math.PI / 2));

    // is the player approaching to the spike?
    spike.approaching = false;
  }

  // 업데이트될 정보를 입력
  override update() {
    console.log('update');

    // are we playing?
    if (!this.gameOver) {
      // is the player jumping?
      if (this.player.jumps > 0) {
        // adjusting player jump offset
        this.player.jumpOffset += this.player.jumpForce;
        // decreasing jump force due to gravity
        this.player.jumpForce -= this.gameOptions.worldGravity;
        // if jumpOffset is less than zero, it means the player touched the ground
        if (this.player.jumpOffset < 0) {
          // setting jump offset to zero
          this.player.jumpOffset = 0;
          // player is not jumping anymore
          this.player.jumps = 0;
          // there is no jump force
          this.player.jumpForce = 0;
        }
      }

      // setting new player current angle according to current position and speed
      this.player.currentAngle = Phaser.Math.Angle.WrapDegrees(this.player.currentAngle + this.gameOptions.playerSpeed);
      // moving the mask image accordingly
      this.maskImage.angle = this.player.currentAngle + 90;
      // getting the same angle in radians
      const radians = Phaser.Math.DegToRad(this.player.currentAngle);
      // determining the distance from the center according to planet radius, player radius and jump offset
      const distanceFromCenter = (this.gameOptions.bigCircleRadius * 2 + this.gameOptions.playerRadius * 2) / 2 + this.player.jumpOffset;
      // position the player using trigonometry
      this.player.x = this.bigCircle.x + distanceFromCenter * Math.cos(radians);
      this.player.y = this.bigCircle.y + distanceFromCenter * Math.sin(radians);
      // determining the number of revolutions the player has to do move according to planet and player size
      const revolutions = (this.gameOptions.bigCircleRadius * 2) / (this.gameOptions.playerRadius * 2) + 1;
      // set player rotation according to current angle and the number of revolutions needed
      this.player.angle = this.player.currentAngle * revolutions;
      // looping through each spike, as child of spikeGroup
      this.spikeGroup.children.iterate((spike: any) => {
        // getting angle difference between the spike and the player
        const angleDiff = this.getAngleDifference(spike.angle, this.player.currentAngle);
        // if the player is not approaching the spike and it's close enough...
        if (!spike.approaching && angleDiff < this.gameOptions.closeToSpike) {
          // player is approaching the spike
          spike.approaching = true;
        }

        // if the player is approaching the spike...
        if (spike.approaching) {
          // checking for collision between the player and the two triangle sizes
          if (this.distToSegmentSquared(
              new Phaser.Math.Vector2(this.player.x, this.player.y),
              this.gameOptions.playerRadius,
              spike.top,
              spike.base1
            ) ||
            this.distToSegmentSquared(
              new Phaser.Math.Vector2(this.player.x, this.player.y),
              this.gameOptions.playerRadius,
              spike.top,
              spike.base2
            )
          ) {
            // game over man...
            this.gameOver = true;
            // stop leaving a trail
            this.emitter.stop();
            // shaking the camera
            this.cameras.main.shake(800, 0.01);
            // waiting 2 seconds
            this.time.addEvent({
              // delay, in milliseconds
              delay: 2000,
              // callback function, to restart the scene
              callback: () => {
                this.scene.start('PlayGame');
              },
              // callback scope
              callbackScope: this
            });

            // let's make an explosion, first we define the particle...
           this.add.particles(0, 0, 'particle', {
              // particle speed
              speed: {
                min: -50,
                max: 50
              },
              // particle size
              scale: {
                start: 0.2,
                end: 0.25
              },
              // particle alpha
              alpha: {
                start: 1,
                end: 0
              },
              // particle lifespan, in milliseconds
              lifespan: 2000
            });

            // hide the player
            this.player.visible = false;
          }

          // if we are getting too far from the spike...
          if (angleDiff > this.gameOptions.farFromSpike) {

            // recycle the spike and move it in a random position three quadrants further
            this.placeSpike(spike, (spike.quadrant + 3) % 4);
          }
        }
      }, this);
    }
    // this.graphics.lineStyle(2, 0xffffff, 1);
    // this.path.draw(this.graphics);
  }

  // function to get the minimum difference between two angles a1 and a2
  private getAngleDifference(a1: number, a2: number) {
    let angleDifference = a1 - a2
    angleDifference += (angleDifference > 180) ? -360 : (angleDifference < -180) ? 360 : 0
    return Math.abs(angleDifference);
  }

  // function to get the distance between two points p1 and p2
  private getDistance(p1: any, p2: any) {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
  }

  // function to determine if a circle is touching a line segment given the circle center, the radius and the points defining the segment
  private distToSegmentSquared(circleCenter: any, circleRadius: number, segmentStart: any, segmentEnd: any) {
    const l2 = this.getDistance(segmentStart, segmentEnd);
    let t = ((circleCenter.x - segmentStart.x) * (segmentEnd.x - segmentStart.x) + (circleCenter.y - segmentStart.y) * (segmentEnd.y - segmentStart.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const tX = segmentStart.x + t * (segmentEnd.x - segmentStart.x);
    const tY = segmentStart.y + t * (segmentEnd.y - segmentStart.y);
    const tPoint = {
      x: tX,
      y: tY
    }
    return this.getDistance(circleCenter, tPoint) < circleRadius * circleRadius;
  }

}
