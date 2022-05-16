import { Component } from '@angular/core';
import { AccuWeatherService } from './accu-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherApp';
  telaviv:String ='tel aviv'
  weatherTelaviv:any
  constructor(private AccuWeatherService:AccuWeatherService){

  }


  ngOnInit(){
}
}

