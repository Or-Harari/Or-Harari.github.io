import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccuWeatherService } from '../accu-weather.service';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { Store } from '@ngrx/store';
import { WeatherDisplay } from './weatherDisplay.model';
import { Observable } from 'rxjs';
import *as WeatherActions from './store/weather.actions'
import { lastSearch } from './last-search.model';
import { HttpClient } from '@angular/common/http';
import { Favorites } from './favorite.model';
import { ForecastPageComponent } from './forecast-page/forecast-page.component';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.css']
})
export class WeatherPageComponent implements OnInit {


  weatherForecast:Observable<{weatherForecast:WeatherDisplay[]}> ;
  search:Observable<{search:lastSearch[]}> ;
  // addFavorite:Observable<{faorite:Favorites[]}>;
  hasBeenSearched:Boolean = false;
  public weatherSearchForm: FormGroup;
  isTracking:Boolean = false;
  telaviv:String ='tel aviv'
  weatherTelaviv:String;
  thisLocation:any;
  name:String;
  last:lastSearch[]=[];
  x:number =0
  searchFiels:String ='';
  locationKey:number;
  id:number;
  
  

  constructor(

    private formBuilder: FormBuilder,
    private http:HttpClient,
    public AccuWeatherService:AccuWeatherService,
    private store:Store<{weatherDisp: {weatherForecast:WeatherDisplay[]} }>,
    private store1:Store<{searchLoc: {search:lastSearch[]} }>) {
      this.search = store1.select('searchLoc')
      this.weatherForecast = store.select('weatherDisp')
    }
    

  ngOnInit() {
    this.AccuWeatherService.getCurrentWeatherOfTelAviv();
    this.weatherForecast = this.store.select('weatherDisp');
    this.search = this.store1.select('searchLoc');
  
    this.weatherSearchForm = this.formBuilder.group({
    location: ['']
    });
    
  }

  autoSearch(event){
    console.log(event.value)
    this.searchFiels = event.value
    this.hasBeenSearched = false;
    this.AccuWeatherService.getForecast(event.value);
    this.hasBeenSearched = true;
    }
  
    sendToAccuweather(formValue){
  this.hasBeenSearched = false;
  this.AccuWeatherService.getForecast(formValue.location);
  this.hasBeenSearched = true;
     
      }
      autoSearchSend(event:any){
        this.AccuWeatherService.autoSearch(event.location)

      }    

    }


