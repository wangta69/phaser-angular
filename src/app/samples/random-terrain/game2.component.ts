// https://www.emanueleferonato.com/wp-content/uploads/2021/04/terrain/terrain.zip
// https://www.emanueleferonato.com/2019/08/10/the-basics-of-infinite-terrain-generation-for-a-horizontal-endless-runner/ 이것도 보면 좋을 듯
// https://www.emanueleferonato.com/2021/04/30/generate-a-physics-driven-random-terrain-for-your-html5-games-using-phaser-box2d-by-planck-js-and-simplify-js/
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
import * as planck from 'planck';
@Component({
  selector: 'app-root',
  template:``
})
export class RandomTerrain2GameComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x75d5e3,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'thegame',
            width: 1334,
            height: 750
        },
        physics: {
            default: 'matter',
            matter: {
                debug: true,
                debugBodyColor: 0x000000
            }
        },
        scene: playGame
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

export class playGame extends Phaser.Scene {
    private gameOptions = {
        startTerrainHeight: 0.5,
        amplitude: 300,
        slopeLength: [100, 350],
        // slopeLength: [1000, 1000],
        worldScale: 30
    }

    private world: any
    private canvas: any;
    private sliceStart: any; // = new Phaser.Math.Vector2(0, Math.random());
    private slopeGraphics: any;
    private debugDraw: any;

    private polygons: number = 0;



    constructor() {
        super({
            key: 'PlayGame',
        });
    }

    public preload()  {
        this.canvas = this.sys.game.canvas;

    }

    public create()  {
        const gravity = planck.Vec2(0, 3);
        this.world = planck.World(gravity);
        this.debugDraw = this.add.graphics();
        this.debugDraw = this.add.graphics();
        this.sliceStart = new Phaser.Math.Vector2(0, Math.random());
        this.drawTerrain(this.slopeGraphics, this.sliceStart);


        this.drawTerrain1();
    }

    private drawTerrain1() {
        const temp = [
            -450,0,
            87,0,
            148,-4,
            200,-0,
            251,4,
            289,13,
            335,18,
            369,9,
            383,14,
            410,3,
            433,2,
            467,10,487,20,512,23,545,8,571,1,591,-16,623,-24,647,-20,678,-22,695,-35,743,-44,776,-40,820,-25,870,-22,912,-37,934,-44,954,-38,974,-45,996,-39,1037,-49,1059,-63,1086,-84,1115,-85,1153,-72,1193,-77,1281,-127,1306,-141,1331,-144,1355,-155,1401,-175,1441,-173,1505,-153,1566,-143,1604,-141,1653,-154,1687,-141,1715,-112,1743,-57,1764,-35,1783,-43,1804,-96,1805,-132,1812,-142,1873,-149,1931,-140,2023,-126,2066,-143,2088,-166,2102,-189,2130,-204,2168,-207,2234,-205,2261,-191,2286,-163,2316,-117,2340,-82,2383,-55,2437,-41,2483,-37,2507,-40,2535,-46,2553,-51,2588,-80,2609,-94,2626,-113,2646,-132,2671,-154,2686,-164,2714,-175,2758,-179,3064,-204,3099,-189,3177,-190,3200,-214,3274,-203,3324,-185,3421,-169,3484,-159,3559,-158,3613,-168,3646,-173,3681,-168,3695,-99,3712,75,3777,211,3829,115,3882,285,3908,203,3963,283,4079,-4,4092,-32,4113,-41,4167,-36,4262,-9,4372,29,4504,43,4649,49,4674,29,4713,14,4760,14,4803,38,4819,15,4858,-1,4896,5,4925,31,4960,17,5006,15,5050,24,5078,41,5898,41,5899,115,-450,115,
            -449,0];

        const groundVertices: any = [];
        for(let i = 0; i < temp.length; i = i + 2) {
            const ver = planck.Vec2(temp[i], temp[i + 1] + 500);
            groundVertices.push(ver);
        }

        const ground = this.world.createBody();
        const worldScale = this.gameOptions.worldScale;
        console.log('groundVertices >>', groundVertices);
        for (let i = 1; i < groundVertices.length; i ++) {
            console.log( groundVertices[i - 1].x, groundVertices[i - 1].y, groundVertices[i].x, groundVertices[i].y)
            ground.createFixture(planck.Edge(planck.Vec2(
                groundVertices[i - 1].x / worldScale,
                groundVertices[i - 1].y / worldScale), planck.Vec2(groundVertices[i].x / worldScale, groundVertices[i].y / worldScale)), {
                density: 0,
                friction : 1
            });
        }
    }

    private drawTerrain(graphics: any, sliceStart: any) {

        let ground = this.world.createBody();
        let slopePoints = [];
        // let slopes = 0;
        let slopeStart = 0;
        let slopeStartHeight = sliceStart.y;
        let currentSlopeLength = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]);
        let slopeEnd = slopeStart + currentSlopeLength;
        let slopeEndHeight = Math.random();
        let currentPoint = 0;
        while (currentPoint < this.canvas.width) {
            if (currentPoint == slopeEnd) {
                // slopes ++;
                slopeStartHeight = slopeEndHeight;
                slopeEndHeight = Math.random();
                var y = this.canvas.height * this.gameOptions.startTerrainHeight + slopeStartHeight * this.gameOptions.amplitude;
                slopeStart = currentPoint;
                currentSlopeLength = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]);
                slopeEnd += currentSlopeLength;
            }
            else {
                var y = (this.canvas.height * this.gameOptions.startTerrainHeight) + this.interpolate(slopeStartHeight, slopeEndHeight, (currentPoint - slopeStart) / (slopeEnd - slopeStart)) * this.gameOptions.amplitude;
            }
            slopePoints.push(new Phaser.Math.Vector2(currentPoint, y))
            currentPoint ++ ;
        }
        const simpleSlope = simplify(slopePoints, 1, true);

        console.log('simpleSlope >>', simpleSlope); // Vector2 {x: 0, y: 611.1416273583056}
        for (let i = 1; i < simpleSlope.length; i ++) {
            ground.createFixture(planck.Edge(planck.Vec2(simpleSlope[i - 1].x / this.gameOptions.worldScale, simpleSlope[i - 1].y / this.gameOptions.worldScale), planck.Vec2(simpleSlope[i].x / this.gameOptions.worldScale, simpleSlope[i].y / this.gameOptions.worldScale)), {
                density: 0,
                friction : 1
            });
        }
        this.add.text(0, this.canvas.height - 60, "Edges to generate terrain: " + simpleSlope.length, {
            fontFamily: "Arial",
            fontSize: "48",
            color: "#00ff00"
        });
        this.polygons = 0;
        this.time.addEvent({
            delay: 500,
            callbackScope: this,
            callback: () => {
                this.createBox(Phaser.Math.Between(0, this.canvas.width), -50, Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60))
                this.polygons ++;
                if(this.polygons > 30){
                    this.scene.start("PlayGame");
                }
            },
            loop: true
        });
    }

    createBox(posX: number, posY: number, width: number, height: number) {
        let box = this.world.createBody();
        box.setDynamic();
        box.createFixture(planck.Box(width / 2 / this.gameOptions.worldScale, height / 2 / this.gameOptions.worldScale));
        box.setPosition(planck.Vec2(posX / this.gameOptions.worldScale, posY / this.gameOptions.worldScale));
        box.setMassData({
            mass: 1,
            center: planck.Vec2(),
            I: 1
        });
        return box;
    }

    override update(t: number, dt: number) {
        this.world.step(dt / 1000 * 2);
        this.world.clearForces();
        this.debugDraw.clear();
        for (let body = this.world.getBodyList(); body; body = body.getNext()) {
            this.debugDraw.beginPath();
            for (let fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
                let shape = fixture.getShape();
                switch (fixture.getType()) {
                    case "edge":
                        this.debugDraw.lineStyle(4, 0xff0000);
                        let v1 = shape.m_vertex1;
                        let v2 = shape.m_vertex2;
                        this.debugDraw.moveTo(v1.x * this.gameOptions.worldScale, v1.y * this.gameOptions.worldScale);
                        this.debugDraw.lineTo(v2.x * this.gameOptions.worldScale, v2.y * this.gameOptions.worldScale);
                        this.debugDraw.strokePath();
                        break;
                    default:
                        this.debugDraw.lineStyle(2, 0x00ff00);
                        this.debugDraw.fillStyle(0x00ff00, 0.2);
                        let vertices = shape.m_vertices.length;
                        for (let i = 0; i < vertices; i ++) {
                            let vertex = shape.getVertex(i);
                            let worldPosition = body.getWorldPoint(vertex);
                            if (i == 0) {
                                this.debugDraw.moveTo(worldPosition.x * this.gameOptions.worldScale, worldPosition.y * this.gameOptions.worldScale);
                            } else {
                                this.debugDraw.lineTo(worldPosition.x * this.gameOptions.worldScale, worldPosition.y * this.gameOptions.worldScale);
                            }
                        }
                        this.debugDraw.closePath();
                        this.debugDraw.strokePath();
                        this.debugDraw.fillPath();
                        break;
                }
            }
        }
    }

    private interpolate(vFrom: number, vTo: number, delta: number) {
        const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
        return vFrom * (1 - interpolation) + vTo * interpolation;
    }

}

