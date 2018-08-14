import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SakilaService, FilmDetail } from '../sakila.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  film: FilmDetail = null;

  constructor(private sakilaSvc: SakilaService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const fid = this.activatedRoute.snapshot.params.fid;
    console.log('>> film id = ', fid);
    this.sakilaSvc.getDetails(fid)
      .then(result => {
        console.log('result: ', result);
        this.film = result;
      })
      .catch(err => {
        console.error('Error: ', err);
      })
  }

  back() {
    this.router.navigate(['/']);
  }

}
