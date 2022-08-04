import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SampleComponent1 } from './samples/sample1/sample.component';
import { SampleComponent2 } from './samples/sample2/sample.component';
import { Bricks } from './samples/block-game/sample.component';
import { Tank } from './samples/tank-game/sample.component';
import { TextureComponent } from './samples/texture/sample.component';

import { ParticleComponent } from './samples/particles/sample.component';
import { SnowComponent } from './samples/particles/snow.component';
import { ExplodeComponent } from './samples/particles/explode.component';
import { BombComponent } from './samples/bomb/bomb.component';
import { PirateComponent } from './samples/pirate/pirate.component';
import { Pirate1Component } from './samples/pirate/pirate1.component';

import { BasicGameComponent1 } from './samples/basic-game/sample01.component';
import { BasicGameComponent2 } from './samples/basic-game/sample02.component';
import { BasicGameComponent3 } from './samples/basic-game/sample03.component';
import { BasicGameComponent4 } from './samples/basic-game/sample04.component';
import { BasicGameComponent5 } from './samples/basic-game/sample05.component';
import { BasicGameComponent6 } from './samples/basic-game/sample06.component';
import { BasicGameComponent7 } from './samples/basic-game/sample07.component';
import { BasicGameComponent8 } from './samples/basic-game/sample08.component';
import { BasicGameComponent9 } from './samples/basic-game/sample09.component';
import { Animation } from './samples/animation/animation.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent1,
    SampleComponent2,
    Bricks,
    Tank,
    TextureComponent,
    ParticleComponent,
    SnowComponent,
    ExplodeComponent,
    BasicGameComponent1,
    BasicGameComponent2,
    BasicGameComponent3,
    BasicGameComponent4,
    BasicGameComponent5,
    BasicGameComponent6,
    BasicGameComponent7,
    BasicGameComponent8,
    BasicGameComponent9,
    Animation,
    BombComponent,
    PirateComponent,
    Pirate1Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
