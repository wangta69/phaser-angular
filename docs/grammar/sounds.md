# 사운드 처리하기

```
preload()
    {
        this.load.audio('bg-sound', 'assets/sounds/sound-file');
        this.load.audio('effect-sound', 'assets/sounds/sound-file')
    }
create()
{
    // bg sound 일경우
    this.sound.play('bg-sound', {
        loop: true,
        volume: 0.9
    })

    // 혹은 아래와 같이 정의하여도 무방한다.
    const bgSound = this.sound.add('bg-sound'); // // Add a background music to the game on a loop
    bgSound.play({loop: true, volume: 0.9})
}

```
일단 로드된 상태이며 아래처럼 필요한 곳에서 처리하면 된다.
```
this.sound.play('effect-sound');
```

만약 멈추고 싶을 경우는 sound를 변수에 넣은 후 호출하여 사용하여야 한다.
```
create(){
    const effectSound = this.sound.add('effect-sound');
    effectSound.play({volume: 0.9});
    effectSound.stop();
}

```
혹은
```
this.sound.get('effect-sound').stop();
```