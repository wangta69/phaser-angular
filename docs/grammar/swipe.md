# SWIPE

```
npm i phaser3-rex-plugins
npm i phaser3-rex-plugins-types
```
```
import GesturesPlugin from 'phaser3-rex-plugins/plugins/gestures-plugin.js';
var config = {
    // ...
    plugins: {
        scene: [{
            key: 'rexGestures',
            plugin: GesturesPlugin,
            mapping: 'rexGestures'
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config)
```
```
var swipe = scene.rexGestures.add.swipe(config);
```

```
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexgesturesplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgesturesplugin.min.js',
            sceneKey: 'rexGestures'
        });      
    }

    create() {
        this.print = print = this.add.text(0, 0, '')

        this.swipeInput = this.rexGestures.add.swipe({ velocityThreshold: 1000 })
            .on('swipe', function (swipe) {
                print.text += `swipe, v = ${swipe.dragVelocity}\n`;
            }, this);
    }

    update() {
        if (this.swipeInput.isSwiped) {
            this.print.text += `update(): swipe ${dumpDirectionStates(this.swipeInput)}\n`;
        }
    }
}

var directions = ['left', 'right', 'up', 'down'];
var dumpDirectionStates = function (swipe) {
    var s = '';
    var dir;
    for (var i = 0, cnt = directions.length; i < cnt; i++) {
        dir = directions[i];
        if (swipe[dir]) {
            s += ' ' + dir;
        }
    }
    return s;
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);
```