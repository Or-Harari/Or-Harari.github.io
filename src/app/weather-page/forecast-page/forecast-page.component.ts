import { Component, OnInit } from '@angular/core';

import { Favorites } from '../favorite.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AccuWeatherService } from 'src/app/accu-weather.service';
import { WeatherPageComponent } from '../weather-page.component';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.css']
})
export class ForecastPageComponent implements OnInit {
  id:number;
    name:String;
    currentWeather:String;
    items:Favorites[]=[]
    favo:Observable<{favorite:Favorites[]}> ;
    weatherPage:WeatherPageComponent ;




constructor(
  private acc:AccuWeatherService,
  
    private store:Store<{favorite: {favorite:Favorites[]} }>
    ) {
    
   }

  ngOnInit() {
    this.items = this.acc.getFav()
    
 }
 getforecast(data:any){
this.acc.getForecast(data)

}
deleteFav(data:any){
  this.acc.DeleteFav(data);
  // this.acc.updateFavorite();
  this.items = this.acc.getFav()
}
checkFavorite(){
  for(const x=0; x<this.items.length;x+1){
    if(this.items[x].name = this.acc.name){
      return true
    }

  }
}


}


