import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';

export interface WeatherData {
    main: string;
    description: string;
    icon: string;
}

@Injectable()
export class WeatherService {

    constructor(private http: HttpClient) { }

    getWeather(city = 'singapore') {
        //method chaining
        const qs = new HttpParams()
            .set('q', city)
            .set('name', 'Fred Flintstone')
            .set('appid', '__YOUR_API_KEY_HERE__');

        return (
            this.http.get<WeatherData[]>('http://api.openweathermap.org/data/2.5/weather'
                , { params: qs })
                .toPromise()
                .then((data) => {
                    const w: WeatherData[] = [];
                    for (let i of data['weather']) {
                        w.push({
                            main: i['main'],
                            description: i['description'],
                            icon: i['icon'],
                        })
                    }
                    return (w);
                })
        )
    }

}