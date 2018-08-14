import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SakilaService, FilmSummary } from '../sakila.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: FilmSummary[] = [];

  constructor(private sakilaSvc: SakilaService, private router: Router) { }

  ngOnInit() {
    this.sakilaSvc.getFilms()
      .then(result => {
        console.info("RESULT: ", result);
        this.films = result;
      })
      .catch(error => {
        console.error("ERROR: ", error);
      })
  }

  getDetails(filmId: number) {
    console.log('Film id: ', filmId);
    // /film/1
    this.router.navigate(['/film', filmId]);
  }

}
