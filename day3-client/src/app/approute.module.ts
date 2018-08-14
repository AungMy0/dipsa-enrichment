import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilmsComponent} from './components/films.component';
import {DetailsComponent} from './components/details.component';

const ROUTES: Routes = [
  { path: "", component: FilmsComponent },
  { path: "films", component: FilmsComponent },
  { path: "film/:fid", component: DetailsComponent },

  //Has to be last - default label in switch
  { path: "**", redirectTo: "/", pathMatch: "full" }
]

@NgModule({

  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]

})
export class AppRouteModule { }
