# TWEEN
-- Ease funciton : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ease-function/

```
this.tweens.add({
    targets: child,
    scaleX: 1,
    scaleY: 1,
    ease: 'Sine.easeInOut',
    duration: 300,
    delay: i * 50,
    repeat: -1,
    yoyo: true
});
```
```
const tween1 = this.tweens.add({
    targets: cardObject,
    scaleX: 0.01,
    ease: 'Linear',
    duration: 300,
    repeat: 0,
    yoyo: false,
    onStart: () => { console.log('onStart'); console.log(arguments); },
    onComplete: () => { this.onTurnCard(cardObject); console.log('onComplete'); console.log(arguments); },
    onYoyo: () => { console.log('onYoyo'); console.log(arguments); },
    onRepeat: () => { console.log('onRepeat'); console.log(arguments); },
});
```

Linear : Phaser.Math.Easing.Linear
Phaser.Math.Easing.Quadratic.InOut