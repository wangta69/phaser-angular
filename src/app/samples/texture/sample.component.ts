import { Component, AfterViewInit } from '@angular/core';
import * as Phaser from 'phaser';
@Component({
  selector: 'app-root',
  template:``
})
export class TextureComponent implements AfterViewInit {
    // name = 'Angular';
    // public game: Phaser.Game;
    public readonly gameConfig = {
        type: Phaser.CANVAS,
        parent: "phaser-example",
        width: 800,
        height: 600,
        backgroundColor: "#2d2d88",
        // scene: {
        //   preload: preload,
        //   create: create
        // },
        loader: {
          baseURL: "/assets/images/texture/",
          // crossOrigin: "anonymous"
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
    private graphics: any;
    private path: any;
    constructor() {
        super({
            key: 'Scene',
        });
    }

    public preload()  {
        this.load.image('brush', 'sparkle1.png');
        this.load.image('grass', 'grass.png');
        this.load.image('bg', 'turkey-1985086.jpg');
    }

    public create()  {
        this.add.image(0, 0, 'bg').setOrigin(0);

        const SCALE = 0.1;
        const texture = this.textures.createCanvas('canvastexture', 800, 600);
        const textureSmall = this.textures.createCanvas(
            'canvastextureSmall',
            SCALE * texture.width,
            SCALE * texture.height
        );

        const grass: any = this.textures.get('grass').getSourceImage();
        const brush = this.textures.get('brush').getSourceImage();

        const brushHalfWidth = this.textures.get('brush').get().halfWidth;
        const brushHalfHeight = this.textures.get('brush').get().halfHeight;

        texture.draw(0, 0, grass);
        texture.draw(512, 0, grass);
        texture.draw(0, 512, grass);
        texture.draw(512, 512, grass);

        const text = this.add.text(80, 0, 'Erase the grass', { backgroundColor: '#0009' })
          .setDepth(1);

        this.add.image(0, 0, 'canvastexture').setOrigin(0);

        // Backing
        this.add
          .rectangle(0, 0, textureSmall.width, textureSmall.height, 0)
          .setOrigin(0);

        // Mini texture
        this.add.image(0, 0, 'canvastextureSmall').setOrigin(0);

        this.input.on('pointermove', (pointer: any) => {
          if (pointer.isDown) {
            this.erase(
              texture,
              brush,
              pointer.x - brushHalfWidth,
              pointer.y - brushHalfHeight
            );
          }
        });

        this.input.on('pointerdown', (pointer: any) => {
          this.erase(
            texture,
            brush,
            pointer.x - brushHalfWidth,
            pointer.y - brushHalfHeight
          );
        });

        this.input.on('pointerup',  () => {
          this.copy(texture, textureSmall);

          const pxCount = this.count(textureSmall);

          console.log(pxCount);

          text.setText(
            `Erased: ${((100 * pxCount.empty) / pxCount.total).toFixed(0)}%`
          );
        });
    }

    // 업데이트될 정보를 입력
    override update()  {
        console.log('update');
        // this.graphics.lineStyle(2, 0xffffff, 1);
        // this.path.draw(this.graphics);
    }

    private erase(canvasTexture: any, source: any, x: number, y: number) {
        canvasTexture.getContext().globalCompositeOperation = 'destination-out';

        canvasTexture.draw(x, y, source);
    }

    private copy(sourceTexture: any, destTexture: any) {
        console.time('copy');

        destTexture
            .clear()
            .getContext()
            .drawImage(
                sourceTexture.getCanvas(),
                0,
                0,
                sourceTexture.width,
                sourceTexture.height,
                0,
                0,
                destTexture.width,
                destTexture.height
            );

        destTexture.update();

        console.timeEnd('copy');
    }

    private count(canvasTexture: any) {
        console.time('count');

        var pixels = canvasTexture.getPixels();
        var filled = 0;
        var total = 0;

        for (var x = 0, c = pixels.length; x < c; x++) {
        var row = pixels[x];

        for (var y = 0, r = row.length; y < r; y++) {
        if (row[y].alpha) filled++;

        total++;
        }
        }

        console.timeEnd("count");

        return { filled: filled, total: total, empty: total - filled };
    }



}

