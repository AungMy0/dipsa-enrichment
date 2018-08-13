import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WeatherService, WeatherData } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('form') form: NgForm;

  weather: WeatherData[] = [];

  constructor(private http: HttpClient, 
      private weatherSvc: WeatherService) { }

  processForm() {
    console.log('cityName: ', this.form.value.cityName);
    this.weatherSvc.getWeather(this.form.value.cityName)
      .then((result: WeatherData[]) => {
        this.weather = result;
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
  }

}
