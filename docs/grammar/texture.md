# Texture
https://photonstorm.github.io/phaser3-docs/Phaser.Textures.Texture.html

텍스처는 소스, 일반적으로 캐시 이미지와 프레임 컬렉션으로 구성됩니다. 프레임은 텍스처의 다른 영역을 나타냅니다. 예를 들어 텍스처 아틀라스에는 아틀라스 내의 각 요소에 대해 하나씩 많은 프레임이 있을 수 있습니다. 반면에 단일 이미지에는 전체 이미지를 포함하는 하나의 프레임만 있을 수 있습니다.

모든 텍스처는 출처에 관계없이 항상 __BASE 프레임이라는 최소 1개의 프레임을 가지고 있습니다. 이 프레임은 소스 이미지의 전체를 나타냅니다.

텍스처는 전역 TextureManager에 의해 관리됩니다. 이것은 텍스처 및 해당 프레임을 생성하고 게임 개체에 전달하는 일을 담당하는 싱글톤 클래스입니다.

스프라이트 및 기타 게임 개체는 TextureManager에서 필요한 텍스처 데이터를 가져옵니다.

```
public preload()  {
    this.load.image('sampleKey', 'path-image');
}

public create()  {
    this.textures.get('sampleKey') // return Texture
}
```
```
this.textures.getBase64('sampleKey'));  // key로 부터 base64 이미지를 return
```
```
const sampleImage = this.textures.get('sampleKey').getSourceImage() // <img src="blob:http://localhost:4200/94446a6e-bce0-4c56-957c-375fda58c588">
```
```
this.textures.get('sampleKey').get() // return Frame
```

canvas로 부터 빈 텍스처를 만들고 그위에 이미지를 그린다.
```
const texture = this.textures.createCanvas('canvastexture', 800, 600); // return CanvasTexture 
texture.draw(x, y, sampleImage);
```
이미지를 그렸으면 이미지를 디스플레이한다.
```
this.add.image(0, 0, 'canvastexture').setOrigin(0);
```

위에서 보는 것처럼 텍스쳐는 preload된 이미지를 재가공하기 위해 사용되어지는 것이라 보여진다.