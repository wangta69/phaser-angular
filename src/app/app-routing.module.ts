import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleComponent1 } from './samples/sample1/sample.component';
import { Bricks } from './samples/block-game/sample.component';

const routes: Routes = [
    { path: 'samples/sample1', component: SampleComponent1 },
    { path: 'samples/game-bricks', component: Bricks },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
