// https://www.emanueleferonato.com/wp-content/uploads/2021/04/terrain/terrain.zip
// https://www.emanueleferonato.com/2019/08/10/the-basics-of-infinite-terrain-generation-for-a-horizontal-endless-runner/ 이것도 보면 좋을 듯
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
@Component({
  selector: 'app-root',
  template:``
})
export class RandomTerrainGameComponent implements AfterViewInit {
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

    private canvas: any;
    private sliceStart: any; // = new Phaser.Math.Vector2(0, Math.random());
    private slopeGraphics: any;

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
        console.log('create');
        this.slopeGraphics = this.add.graphics();
        this.sliceStart = new Phaser.Math.Vector2(0, Math.random());
        this.drawTerrain(this.slopeGraphics, this.sliceStart);
    }

    private drawTerrain(graphics: any, sliceStart: any) {

        console.log('drawTerrain >>', sliceStart, this.canvas.width);
        const terrainPoints = [];
        // let slopes = 0;
        let slopeStartX = 0; // 변곡시작점 X
        let slopeStartHeight = sliceStart.y;

        // x 가 0에서 부터 증가하다가 ccurrentSlopeWidth 와 만나면 각을 꺽는 방식이다.
        let ccurrentSlopeWidth = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]); // 주어진 slopeLength 사이에서 임의의 값을 추출한다.
        // console.log('ccurrentSlopeWidth >>', ccurrentSlopeWidth);
        let slopeEndX = slopeStartX + ccurrentSlopeWidth; // 변곡점 x
        let slopeEndHeight = Math.random();
        let terrainX = 0;
        let terrainY = 0;
        // console.log('ccurrentSlopeWidth: ', ccurrentSlopeWidth);
        while(terrainX < this.canvas.width){
            if (terrainX == slopeEndX) { // 변곡구간에 오면 다음 변곡 구간까지의 새로운 좌표를 만들어 준다.
                // slopes ++;
                slopeStartHeight = slopeEndHeight; // random
                slopeEndHeight = Math.random();

                terrainY = this.canvas.height * this.gameOptions.startTerrainHeight + slopeStartHeight * this.gameOptions.amplitude;
                slopeStartX = terrainX;
                ccurrentSlopeWidth = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]);

                slopeEndX += ccurrentSlopeWidth; // 1~ canvas width 사이의 특정
                console.log('slopeStartHeight: ', slopeStartHeight, 'slopeEndHeight: ', slopeEndHeight, 'slopeStartX: ', slopeStartX, 'slopeEndX: ', slopeEndX, 'ccurrentSlopeWidth: ', ccurrentSlopeWidth );
            }else{
                terrainY = (this.canvas.height * this.gameOptions.startTerrainHeight) + this.interpolate(slopeStartHeight, slopeEndHeight, (terrainX - slopeStartX) / (slopeEndX - slopeStartX)) * this.gameOptions.amplitude;
            }

            // console.log(terrainX, y)
            terrainPoints.push(new Phaser.Math.Vector2(terrainX, terrainY))
            terrainX ++ ;
        }
        const simpleSlope = simplify(terrainPoints, 1, true);
        graphics.x = sliceStart.x;
        graphics.clear();
        graphics.moveTo(0, this.canvas.height);
        graphics.fillStyle(0x654b35);
        graphics.beginPath();
        simpleSlope.forEach((point: any) => {
            graphics.lineTo(point.x, point.y);
        })
        graphics.lineTo(terrainX, this.canvas.height);
        graphics.lineTo(0, this.canvas.height);
        graphics.closePath();
        graphics.fillPath();
        graphics.lineStyle(16, 0x6b9b1e);
        graphics.beginPath();
        simpleSlope.forEach((point: any) =>{
            graphics.lineTo(point.x, point.y);
        })
        graphics.strokePath();

        // 물리적 기능을 추가한다.
        for(let i = 1; i < simpleSlope.length; i++){
            console.log(i);
            const line = new Phaser.Geom.Line(simpleSlope[i - 1].x, simpleSlope[i - 1].y, simpleSlope[i].x, simpleSlope[i].y);
            const distance = Phaser.Geom.Line.Length(line);
            const center = Phaser.Geom.Line.GetPoint(line, 0.5);
            const angle = Phaser.Geom.Line.Angle(line)
            this.matter.add.rectangle(center.x, center.y, distance, 10, {
                isStatic: true,
                angle: angle
            })
        }
        this.add.text(0, this.canvas.height - 60, 'Bodies to generate terrain: ' + simpleSlope.length, {
            fontFamily: 'Arial',
            fontSize: '64',
            color: '#00ff00'
        });
        this.polygons = 0;
        this.time.addEvent({
            delay: 500,
            callbackScope: this,
            callback: () => {
                this.matter.add.polygon(Phaser.Math.Between(0, this.canvas.width), -50, Phaser.Math.Between(3, 10), Phaser.Math.Between(10, 40));
                this.polygons ++;
                if(this.polygons > 60){
                    this.scene.start('PlayGame');
                }
            },
            loop: true
        });
    }

    // 업데이트될 정보를 입력
    // override update(t, dt)  {
    //     this.world.step(dt / 1000 * 2);
    //            this.world.clearForces();
    //            this.debugDraw.clear();
    //            for (const body = this.world.getBodyList(); body; body = body.getNext()) {
    //                this.debugDraw.beginPath();
    //                for (const fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
    //                    const shape = fixture.getShape();
    //                    switch (fixture.getType()) {
    //                        case 'edge': {
    //                            this.debugDraw.lineStyle(4, 0xff0000);
    //                            const v1 = shape.m_vertex1;
    //                            const v2 = shape.m_vertex2;
    //                            this.debugDraw.moveTo(v1.x * this.gameOptions.worldScale, v1.y * this.gameOptions.worldScale);
    //                            this.debugDraw.lineTo(v2.x * this.gameOptions.worldScale, v2.y * this.gameOptions.worldScale);
    //                            this.debugDraw.strokePath();
    //                            break;
    //                        }
    //                        default: {
    //                            this.debugDraw.lineStyle(2, 0x00ff00);
    //                            this.debugDraw.fillStyle(0x00ff00, 0.2);
    //                            const vertices = shape.m_vertices.length;
    //                            for (const i = 0; i < vertices; i ++) {
    //                                const vertex = shape.getVertex(i);
    //                                const worldPosition = body.getWorldPoint(vertex);
    //                                if (i == 0) {
    //                                    this.debugDraw.moveTo(worldPosition.x * this.gameOptions.worldScale, worldPosition.y * this.gameOptions.worldScale);
    //                                }
    //                                else {
    //                                    this.debugDraw.lineTo(worldPosition.x * this.gameOptions.worldScale, worldPosition.y * this.gameOptions.worldScale);
    //                                }
    //                            }
    //                            this.debugDraw.closePath();
    //                            this.debugDraw.strokePath();
    //                            this.debugDraw.fillPath();
    //                            break;
    //                        }
    //                    }
    //                }
    //            }
    // }

    private interpolate(vFrom: number, vTo: number, delta: number) {
        const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
        return vFrom * (1 - interpolation) + vTo * interpolation;
    }

}

