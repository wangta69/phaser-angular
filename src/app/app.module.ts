import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SampleComponent1 } from './samples/sample1/sample.component';
import { Bricks } from './samples/block-game/sample.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent1,
    Bricks
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
