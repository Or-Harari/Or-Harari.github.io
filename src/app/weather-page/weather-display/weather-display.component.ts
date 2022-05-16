import { Component, OnInit } from '@angular/core';
import { WeatherDisplay } from '../weatherDisplay.model';
import { AccuWeatherService } from 'src/app/accu-weather.service';
import { Store } from '@ngrx/store';
import * as WeatherDisplayActions from '../store/weather.actions';
import { Observable } from 'rxjs';
import { WeatherPageComponent } from '../weather-page.component';
import { ForecastPageComponent } from '../forecast-page/forecast-page.component';


@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit {
  
  
  weatherForecast:Observable<{weatherForecast:WeatherDisplay[]}> ;
  constructor(private accu:AccuWeatherService,
    private weat:WeatherPageComponent,
  private store:Store<{weatherDisp: {weatherForecast:WeatherDisplay[]} }>) {}
    

  ngOnInit() {
    this.weatherForecast = this.store.select('weatherDisp');
    
  }
//   check(name){
    
//     for(const x =0; x<this.forecast.items.length; x+1){
//     if(name == this.forecast.items[x].name){
//       (<HTMLInputElement>document.getElementById('ll')).disabled = true;
      
//     }
//     }
// }


}
