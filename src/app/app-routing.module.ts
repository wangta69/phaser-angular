import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent1 } from './samples/sample1/sample.component';
import { Bricks } from './samples/block-game/sample.component';
import { BasicGameComponent1 } from './samples/basic-game/sample01.component';
import { BasicGameComponent2 } from './samples/basic-game/sample02.component';
import { BasicGameComponent3 } from './samples/basic-game/sample03.component';
import { BasicGameComponent4 } from './samples/basic-game/sample04.component';
import { BasicGameComponent5 } from './samples/basic-game/sample05.component';
import { BasicGameComponent6 } from './samples/basic-game/sample06.component';
import { BasicGameComponent7 } from './samples/basic-game/sample07.component';
import { BasicGameComponent8 } from './samples/basic-game/sample08.component';
import { BasicGameComponent9 } from './samples/basic-game/sample09.component';

const routes: Routes = [
    { path: 'samples/sample1', component: SampleComponent1 },
    { path: 'samples/game-bricks', component: Bricks },
    { path: 'samples/basicgame/step1', component: BasicGameComponent1 },
    { path: 'samples/basicgame/step2', component: BasicGameComponent2 },
    { path: 'samples/basicgame/step3', component: BasicGameComponent3 },
    { path: 'samples/basicgame/step4', component: BasicGameComponent4 },
    { path: 'samples/basicgame/step5', component: BasicGameComponent5 },
    { path: 'samples/basicgame/step6', component: BasicGameComponent6 },
    { path: 'samples/basicgame/step7', component: BasicGameComponent7 },
    { path: 'samples/basicgame/step8', component: BasicGameComponent8 },
    { path: 'samples/basicgame/step9', component: BasicGameComponent9 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
