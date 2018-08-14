import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilmsComponent } from './components/films.component';
import { DetailsComponent } from './components/details.component';
import {AppRouteModule} from './approute.module';
import {SakilaService} from './sakila.service';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule, AppRouteModule, HttpClientModule
  ],
  providers: [ SakilaService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
