import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { BombComponent } from './samples/bomb/bomb.component';
import { PirateComponent } from './samples/pirate/pirate.component';
import { Pirate1Component } from './samples/pirate/pirate1.component';
import { Box2dGameComponent } from './samples/box2d-planck/game.component';

import {CircularGameComponent} from './samples/game/circular/game.component';
import {RandomTerrainGameComponent} from './samples/random-terrain/game.component';
import {UserTerrainGameComponent} from './samples/random-terrain/game1.component';
import {RandomTerrain2GameComponent} from './samples/random-terrain/game2.component';
import {RiskyGameComponent} from './samples/risky-game/game.component';
import {RiskyGame1Component} from './samples/risky-game/game1.component';
import {DropComponent} from './samples/drop/sample.component';

import {StaticComponent} from './samples/matter/static.component';
import {FixedRotationComponent} from './samples/matter/fixed-rotation.component';

import {AngleComponent} from './samples/math/angle.component';

const routes: Routes = [
    { path: 'samples/sample1', component: SampleComponent1 },
    { path: 'samples/graphic', component: SampleComponent2 },
    { path: 'samples/graphic-to-sprite', component: GraphToSpriteComponent },

    { path: 'samples/game-bricks', component: Bricks },
    { path: 'samples/game-tanks', component: Tank },
    { path: 'samples/game-risky', component: RiskyGameComponent },
    { path: 'samples/game-risky1', component: RiskyGame1Component },
    { path: 'samples/drop', component: DropComponent },
    { path: 'samples/bomb', component: BombComponent },
    { path: 'samples/pirate', component: PirateComponent },
    { path: 'samples/pirate1', component: Pirate1Component },
    { path: 'samples/texture', component: TextureComponent },
    { path: 'samples/texture1', component: Texture1Component },
    { path: 'samples/texture2', component: Texture2Component },
    { path: 'samples/texture3', component: Texture3Component },
    { path: 'samples/randomterrain', component: RandomTerrainGameComponent },
    { path: 'samples/userterrain', component: UserTerrainGameComponent },
    { path: 'samples/randomterrain2', component: RandomTerrain2GameComponent },

    { path: 'samples/box2d', component: Box2dGameComponent },

    { path: 'samples/particles/1', component: ParticleComponent },
    { path: 'samples/particles/snow', component: SnowComponent },
    { path: 'samples/particles/explode', component: ExplodeComponent },
    { path: 'samples/particles/trail', component: TrailComponent },
    { path: 'samples/basicgame/step1', component: BasicGameComponent1 },
    { path: 'samples/basicgame/step2', component: BasicGameComponent2 },
    { path: 'samples/basicgame/step3', component: BasicGameComponent3 },
    { path: 'samples/basicgame/step4', component: BasicGameComponent4 },
    { path: 'samples/basicgame/step5', component: BasicGameComponent5 },
    { path: 'samples/basicgame/step6', component: BasicGameComponent6 },
    { path: 'samples/basicgame/step7', component: BasicGameComponent7 },
    { path: 'samples/basicgame/step8', component: BasicGameComponent8 },
    { path: 'samples/basicgame/step9', component: BasicGameComponent9 },
    { path: 'game/circular', component: CircularGameComponent },
    { path: 'samples/animaion', component: Animation },
    { path: 'samples/timeline', component: TimeLine },
    { path: 'samples/following', component: Following },
    
    { path: 'samples/matter/static', component: StaticComponent },
    { path: 'samples/matter/fixed-rotation', component: FixedRotationComponent },

    { path: 'samples/math/angle', component: AngleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
