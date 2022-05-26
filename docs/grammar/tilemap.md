#TileMap
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/tilemap/
tilemap.json (예)
```
....
"layers":[
       {
        "data":[
           0, 0, 101, 101, 101, 0, 0, 0, 0, 0,
           0, 0, 101, 65, 101, 0, 0, 0, 0, 0,
           0, 0, 101, 0, 101, 101, 101, 101, 0, 0,
           101, 101, 101, 10, 0, 10, 65, 101, 0, 0,
           101, 65, 0, 10, 53, 101, 101, 101, 0, 0,
           101, 101, 101, 101, 10, 101, 0, 0, 0, 0,
           0, 0, 0, 101, 65, 101, 0, 0, 0, 0,
           0, 0, 0, 101, 101, 101, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0
       ],
        "height":10,
         "width":10,
....
"tilesets":[
       {

        "image":"./tilesheet.png",
        "name":"TileSetName",
       }],
"tilewidth":64,
"type":"map",
"version":1.2,
"width":10
}

```

```
1. Load tile map
- scene.load.tilemapTiledJSON(key, url);  // JSON
- scene.load.tilemapCSV(key, url);          // CSV

2. Add tile map object¶
3 Create
- Create map from tiled
* var map = scene.add.tilemap(key);
- Create map from 2d array
var map = this.make.tilemap({
    // data: tileIdxArray,  // [ [], [], ... ]
    tileWidth: 32,
    tileHeight: 32,
    width: 10,
    height: 10
});

- Create map from csv
var map = this.make.tilemap({
    key: 'map',     // csv file
    tileWidth: 32,
    tileHeight: 32
});

4. Add tileset image
var tileset = map.addTilesetImage(tilesetName, key);
```
```
preload() {
    this.load.tilemapTiledJSON('tilemap', `tilemap.json`);
    this.load.spritesheet('tileImage', 'tilesheet.png', {
        frameWidth: 64,
        startFrame: 0
    })
}
```
JSON 형식의 timemap 과 이미지 형식의 tiles 를 로드한다.
```
create() { // d: { level: number }
    const map = this.make.tilemap({ key: 'tilemap' });
    // 로드된 tilemap 파일을 tilemap 형식으로 만들어 준다.
    const tiles = map.addTilesetImage('TileSetName', 'tileImage');
    // map 에 정의된 tilesets 의 name 과 tileImage 를 맵핑하여 tiles에 정의한다.

    this.layer = map.createLayer('Level', tiles, 0, 0);

    this.player = this.layer.createFromTiles(53, 0, { key: 'tiles', frame: 52 }).pop();
    this.player?.setOrigin(0);
}
```
이미지를 fremeWidth 만큼 이동시키면서 (0 ~ ) 분리한다.
json 파일의 data를 width와 height 맞게 배치한 후 그 이미지를 자동으로 출력한다.

tileset 으로 사용하기 위해 맵(this.make.tilemap)에 이미지를 추가한다.
```
addTilesetImage(tilesetName, [key], [tileWidth], [tileHeight], [tileMargin], [tileSpacing], [gid])
```
타일셑에 레이어를 만든다., x, y는 는 world에서의 x, y 포지션이다.
```
createLayer(layerID, tileset [, x] [, y])
```
```
createFromTiles(indexes, replacements, spriteConfig, [scene], [camera], [layer])

spriteConfig : {key, frame}

// 설명
this.layer = map.createLayer('Level', tiles, 0, 0);
this.player = this.layer.createFromTiles(13, 0, { key: 'tileImage', frame: 52 }).pop();
현재 레이어의 tiles 의 13 이라는 값이 있는 곳에 13을 0으로 바꾸고  tileImage의 52번째 프레임으로 바꾼다.
layer.createFromTiles(color, 0, { key: 'tileImage', frame: color })
                                        .map((box: any) => box.setOrigin(0)); <!-- 각 box에 setOrigin을 적용

```
spriteConfig
key : The key of the Texture this Game Object will use to render with, as stored in the Texture Manager
frame : An optional frame from the Texture this Game Object is rendering with.



