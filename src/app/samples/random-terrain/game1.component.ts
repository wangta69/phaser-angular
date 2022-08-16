// https://www.emanueleferonato.com/wp-content/uploads/2021/04/terrain/terrain.zip
// https://www.emanueleferonato.com/2019/08/10/the-basics-of-infinite-terrain-generation-for-a-horizontal-endless-runner/ 이것도 보면 좋을 듯
import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
import * as simplify from 'simplify-js';
@Component({
  selector: 'app-root',
  template:``
})
export class UserTerrainGameComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        type: Phaser.AUTO,
        backgroundColor: 0x75d5e3,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: 1334,
            height: 750
        },
        physics: {
            default: "matter",
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

    private userTer: any =  [
        [0.4, 0.999, 0.3, 0.1, 0.05, 0.9, 0.999,0.01, 0], // Forest
        [0.1, 0.2, 0.3, 0.32, 0.33, 0.32, 0.31, 0.001, 0.1], // desert
        [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.001, 0.1] // city
    ];


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
        const ter = this.userTer[1];
        // const sepratePoint = Math.floor(this.canvas.width / ter[0].length);
        // console.log(sepratePoint );

        console.log('drawTerrain >>', sliceStart, this.canvas.width);
        const terrainPoints = [];
        // let slopes = 0;
        let slopeStartX = 0; // 변곡시작점 X
        let slopeStartHeight = this.convertTerrainValue(ter, 0);

        // x 가 0에서 부터 증가하다가 ccurrentSlopeWidth 와 만나면 각을 꺽는 방식이다.
        let ccurrentSlopeWidth = Math.floor(this.canvas.width / (ter.length - 2))// 주어진 slopeLength 사이에서 임의의 값을 추출한다.
        // console.log('ccurrentSlopeWidth >>', ccurrentSlopeWidth);
        let slopeEndX = slopeStartX + ccurrentSlopeWidth; // 변곡점 x
        let slopeEndHeight = this.convertTerrainValue(ter, 1);
        let terrainX = 0;
        let terrainY = 0;
        // console.log('ccurrentSlopeWidth: ', ccurrentSlopeWidth);
        let i = 1;
        console.log('slopeStartHeight: ', slopeStartHeight, 'slopeEndHeight: ', slopeEndHeight, 'slopeStartX: ', slopeStartX, 'slopeEndX: ', slopeEndX, 'ccurrentSlopeWidth: ', ccurrentSlopeWidth );
        while(terrainX < this.canvas.width){
            if (terrainX == slopeEndX) { // 변곡구간에 오면 다음 변곡 구간까지의 새로운 좌표를 만들어 준다.
                i++;
                // slopes ++;
                slopeStartHeight = slopeEndHeight; // random
                slopeEndHeight = this.convertTerrainValue(ter, i);

                terrainY = this.canvas.height * this.gameOptions.startTerrainHeight + slopeStartHeight * this.gameOptions.amplitude;
                slopeStartX = terrainX;
                // ccurrentSlopeWidth = Phaser.Math.Between(this.gameOptions.slopeLength[0], this.gameOptions.slopeLength[1]);

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
    }

    private convertTerrainValue(ter: any, n: number) {
        return 1 - ter[n];
    }

    private interpolate(vFrom: number, vTo: number, delta: number) {
        const interpolation = (1 - Math.cos(delta * Math.PI)) * 0.5;
        return vFrom * (1 - interpolation) + vTo * interpolation;
    }

}

