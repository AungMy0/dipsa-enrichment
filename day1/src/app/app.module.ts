import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//TypeScript langauge
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PicturesComponent } from './components/pictures.component';

@NgModule({
  declarations: [
    AppComponent,
    PicturesComponent
  ],
  imports: [
    //Angular 
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
