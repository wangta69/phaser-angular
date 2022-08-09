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

Linear : Phaser.Math.Easing.Linear
Phaser.Math.Easing.Quadratic.InOut