# Depth 변경

##  bringToTop
```
this.children.bringToTop([Object]);
```
##  sendToBack
```
this.scene.sendToBack([Object]);
```

## swapPosition
```
 this.scene.swapPosition('background');
```

이렇게 하면 현재 scene 에서 맨 위로 올린다.
특정 위치에 끼워 넣을때...
```
[Object].depth = this.scene.scene.children.list.length;
```

