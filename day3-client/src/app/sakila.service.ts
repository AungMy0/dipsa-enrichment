import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface FilmSummary {
  filmId: number;
  title: string;
}

export interface FilmDetail {
  filmId: number;
  title: string;
  description: string;
  releaseYear: number;
  rating: string;
  specialFeatures: string;
}

const FILMS = "films";
const DETAILS = "film/";

@Injectable()
export class SakilaService {

  cache: FilmSummary[] = [];

  constructor(private http: HttpClient) { }

  getFilms(reload = false): Promise<FilmSummary[]> {

    //Possible to use Dexie for caching
    if (!reload) {
      if (this.cache.length >= 1) {
        console.log('returing result from cache');
        return Promise.resolve(this.cache);
      }
    }
    return (
        this.http.get<FilmSummary[]>(FILMS)
          .toPromise()
          .then(result => {
            console.log("populating cache....");
            this.cache = result;
            return (result);
          })
    );
  }

  getDetails(fid: number): Promise<FilmDetail> {
    return (
      this.http.get<FilmDetail>(DETAILS + fid)
        .toPromise()
    );
  }
}
