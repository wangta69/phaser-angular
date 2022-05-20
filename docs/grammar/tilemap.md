#TileMap

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
preload() {
    this.load.tilemapTiledJSON('tilemap', `tilemap.json`);
    this.load.spritesheet('tiles', 'tilesheet.png', {
        frameWidth: 64,
        startFrame: 0
    })
}
```
```
create() { // d: { level: number }
    const map = this.make.tilemap({ key: 'tilemap' });

    const tiles = map.addTilesetImage('TileSetName', 'tiles');
    this.layer = map.createLayer('Level', tiles, 0, 0);

    this.player = this.layer.createFromTiles(53, 0, { key: 'tiles', frame: 52 }).pop();
    this.player?.setOrigin(0);
}
```
이미지를 fremeWidth 만큼 이동시키면서 (0 ~ ) 분리한다.
json 파일의 data를 width와 height 맞게 배치한 후 그 이미지를 자동으로 출력한다.

tileset 으로 사용하기 위해 맵에 이미지를 추가한다.
```
addTilesetImage(tilesetName, [key], [tileWidth], [tileHeight], [tileMargin], [tileSpacing], [gid])
```
타일셑에 레이어를 만든다., x, y는 는 world에서의 x, y 포지션이다.
```
createLayer(layerID, tileset [, x] [, y])
```
```
createFromTiles(indexes, replacements, spriteConfig, [scene], [camera], [layer])
```
spriteConfig
key : The key of the Texture this Game Object will use to render with, as stored in the Texture Manager
frame : An optional frame from the Texture this Game Object is rendering with.

