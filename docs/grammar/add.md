#기본

## Load
```
this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');
this.load.atlas('flood', 'assets/games/flood/blobs.png', 'assets/games/flood/blobs.json');
```

## add Image
load.image 에서 사용한 texture
```
this.add.image(400, 300, 'texture');
```
frame : background, grid
```
this.add.image(400, 300, 'texture', 'frame');
```

## tweens
에니메이션 설정
```
this.tweens.add({
    targets: block,
    y: block.getData('y'),

    ease: 'Power3',
    duration: 800,
    delay: i,
    onComplete: console.log
});
```
## input
```
this.input.off('gameobjectover', listener);
this.input.off('gameobjectout', listener);
this.input.off('gameobjectdown', listener);
```
```
this.input.on('gameobjectover', listener);
this.input.on('gameobjectout', listener);
this.input.on('gameobjectdown', listener);
```


```
this.input.on('pointerdown', callback, context);
```

아래처럼 setInteractive 사용함으로서 input 기능을 활성화 한다.
```
const sprite = this.add.sprite(x, y, texture);
sprite.setInteractive();
sprite.on('pointerdown', callback, context);
```

키보드로 부터 값을 받기
```
cursors = this.input.keyboard.createCursorKeys();
if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
```
'M' 키 다운시
```
this.input.keyboard.on('keydown-M',  () => {

}, this);
```
JustDown : 눌려졌을때 한번만 이벤트를 받는다.
```
private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
this.cursors = this.input.keyboard.createCursorKeys();
const justLeft = Phaser.Input.Keyboard.JustDown(this.cursors.left!);
```

#### Texture Packing Editor
atlas
http://free-tex-packer.com/download/ : 무료 버젼 사용하기 좋다
https://help.phasereditor2d.com/v3/atlas-editor/index.html
https://www.codeandweb.com/texturepacker

#### fonts
this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-smooth.png', 'assets/fonts/bitmap/atari-smooth.xml');

this.text3 = this.add.bitmapText(180, 200, 'atari', 'So close!\n\nClick to\ntry again', 48).setAlpha(0);
this.text2.setText("00");
this.text3.setVisible(false);
