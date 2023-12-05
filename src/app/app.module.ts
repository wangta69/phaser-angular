import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SampleComponent1 } from './samples/sample1/sample.component';
import { SampleComponent2 } from './samples/graphic/sample.component';
import { GraphToSpriteComponent } from './samples/graphic/graph-to-sprite.component';

import { Bricks } from './samples/block-game/sample.component';
import { Tank } from './samples/tank-game/sample.component';
import { TextureComponent } from './samples/texture/sample.component';
import { Texture1Component } from './samples/texture/sample1.component';
import { Texture2Component } from './samples/texture/sample2.component';
import { Texture3Component } from './samples/texture/sample3.component';

import { ParticleComponent } from './samples/particles/sample.component';
import { SnowComponent } from './samples/particles/snow.component';
import { ExplodeComponent } from './samples/particles/explode.component';
import { TrailComponent } from './samples/particles/trail.component';


import { BombComponent } from './samples/bomb/bomb.component';
import { PirateComponent } from './samples/pirate/pirate.component';
import { Pirate1Component } from './samples/pirate/pirate1.component';
import { Box2dGameComponent } from './samples/box2d-planck/game.component';

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
import { TimeLine } from './samples/timeline/timeline.component';
import { Following } from './samples/following/following.component';
import {CircularGameComponent} from './samples/game/circular/game.component';
import {RandomTerrainGameComponent} from './samples/random-terrain/game.component';
import {UserTerrainGameComponent} from './samples/random-terrain/game1.component';
import {RandomTerrain2GameComponent} from './samples/random-terrain/game2.component';
import {RiskyGameComponent} from './samples/risky-game/game.component';
import {RiskyGame1Component} from './samples/risky-game/game1.component';
import {DropComponent} from './samples/drop/sample.component';

import {AngleComponent} from './samples/math/angle.component';

import {StaticComponent} from './samples/matter/static.component';
import {FixedRotationComponent} from './samples/matter/fixed-rotation.component';
@NgModule({
  declarations: [
    AppComponent,
    SampleComponent1,
    SampleComponent2,
    GraphToSpriteComponent,
    Bricks,
    Tank,
    TextureComponent,
    Texture1Component,
    Texture2Component,
    Texture3Component,
    ParticleComponent,
    SnowComponent,
    ExplodeComponent,
    TrailComponent,
    BasicGameComponent1,
    BasicGameComponent2,
    BasicGameComponent3,
    BasicGameComponent4,
    BasicGameComponent5,
    BasicGameComponent6,
    BasicGameComponent7,
    BasicGameComponent8,
    BasicGameComponent9,
    CircularGameComponent,
    Animation,
    TimeLine,
    Following,
    BombComponent,
    PirateComponent,
    Pirate1Component,
    RandomTerrainGameComponent,
    UserTerrainGameComponent,
    RandomTerrain2GameComponent,
    RiskyGameComponent,
    RiskyGame1Component,
    DropComponent,
    Box2dGameComponent,
    FixedRotationComponent,

    AngleComponent,
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
