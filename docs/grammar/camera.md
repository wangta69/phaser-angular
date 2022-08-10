# 카메라

## shaking the camera
```

this.cameras.main.shake(800, 0.01);
```

## change backgroundColor
```
this.cameras.main.setBackgroundColor(0xffffff);
```

## Set the camera bounds
```
this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
```

## Set the camera to follow
```
this.cameras.main.startFollow(this.ninja);
```

## zoom
```
// zoom = 1: no zoom
// zoom > 1: zoom in
// zoom < 1: zoom out

// zoomTo method allows the camera to zoom at 'zoom' ratio in 1000 milliseconds
// the most important argument is the 4th argument.
// If set to 'false', camera won't adjust its zoom if already zooming.
this.cameras.main.zoomTo(zoom, 1000, 'Linear', false);
```