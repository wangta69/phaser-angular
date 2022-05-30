# Event

## Touch events
https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
```
//  Make them all input enabled
box.setInteractive();
 //  The images will dispatch a 'clicked' event when they are clicked on
box.on([Mouse Event], this.clickHandler, this);
```
```
clickHandler (pointer)
    {
        box.off([Touch Event], this.clickHandler);
        box.input.enabled = false;
        box.setVisible(false);
    }
```
[Touch Event]
pointerdown: (pointer)
pointerdownoutside: (pointer)
pointerup
pointerupoutside
pointermove
pointerover
pointerout
wheel

## 사용자 이벤트
anyname 처럼 이름만 통일하여 사용하면 된다.
이러면 이벤트가 발생한 object를 가져올 수 있다.
```
    for()
        box.setInteractive();
        piece.on('anyname', this.clickHandler, this);

    this.input.on('gameobjectup',  (pointer: any, gameObject: any) =>
        {
            gameObject.emit('anyname', gameObject);
        }, this)

```
gameobjectdown
gameobjectup
gameobjectmove
gameobjectover
gameobjectout

