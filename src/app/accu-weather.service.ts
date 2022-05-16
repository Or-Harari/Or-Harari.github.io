import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherDisplay } from './weather-page/weatherDisplay.model';
import { Store } from '@ngrx/store';
import * as WeatherDisplayActions from './weather-page/store/weather.actions'
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
import { lastSearch } from './weather-page/last-search.model';
import { Favorites } from './weather-page/favorite.model';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AccuWeatherService {
  weekday = ['sunday','Monday','Tuesday','Wednessday','Thursday','Friday','Saturday'];
  locationKey: String;
  forecastArray:[] = [];  
  arrayCount =0
  currWeather:number;
  minTemp:any;
  maxTemp:number;
  city:String;
  date:Date;
  newDate:any
  day:any
  weatherForecast:Observable<{weatherForecast:WeatherDisplay[]}>
  weatherTelaviv:any;
  img:ImageData;
  lastS:Observable<{weatherorecast:lastSearch[]}>
  lastSearchArray:lastSearch[]=[];
  lastSearch:lastSearch;
  name:any
  last:lastSearch[]
  x:number=0
  currentWeather:any;
  id:number =0
  favorite:Favorites;
  addFavorite:Favorites[]=[];
  public storageName: [] = [];
  hasBeenSearched:Boolean;
  index:number = 0
  count:number = 1
 



  apiKey:String = 'OC2yAplQzgnSvjBVrTTyCoWNwH8ojljU'
  
  constructor(private http:HttpClient,
    private store:Store<{weatherDisp: {weatherForecast:WeatherDisplay[]}, favorite:{favorite:Favorites} }>,
    private store1:Store<{searchLoc: {weathrForecas:lastSearch[]} }>,
    private datepipe:DatePipe = new DatePipe('en-US')
    ){
    this.weatherForecast = store.select('weatherDisp')


  }

  setFav(data: any) {
    this.addFavorite = []
    let localData:[] = JSON.parse(localStorage.getItem('kk'))
    console.log(localData.length)
 try{
   if(localData.length > 0){
    this.addFavorite.push(...localData);
   }
   else if (!this.addFavorite){
    console.log('local empty')
   }

}catch{
  console.log('Cannot get')
}

      console.log(data)
      this.addFavorite.push(data)
    localStorage.setItem("kk", JSON.stringify(this.addFavorite));
    
  }
  getFav() {
    const data = JSON.parse(localStorage.getItem('kk') )
    return data;
  }
  DeleteFav(id:number){
    this.addFavorite = JSON.parse(localStorage.getItem('kk'))
    this.addFavorite.splice(id-1,1)

    while(this.addFavorite.length>this.index){
        this.addFavorite[this.index].id= this.count ;
        this.index  = this.index+1
        this.count= this.count+1
      }
      this.index=0
      this.count=1
     localStorage.setItem('kk', JSON.stringify(this.addFavorite))
     
  }


  getForecast(locationKey){
    this.store.dispatch(new WeatherDisplayActions.Reset)
    this.hasBeenSearched = false
    this.name =locationKey;
     this.http.get(
      'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke&q=' + locationKey)
       .subscribe(posts =>{
        this.locationKey = JSON.parse(posts[0].Key);    
        
        this.http.get(  
          'https://dataservice.accuweather.com/currentconditions/v1/' + this.locationKey +'?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke'
        ).subscribe(curWeather => {
        this.currWeather = JSON.parse(curWeather[0].Temperature.Metric.Value);
        this.convertToC(this.currWeather)
        console.log(this.currWeather)
        this.city = this.name;
        })
    
      this.http.get(
        'https://dataservice.accuweather.com/forecasts/v1/daily/5day/'+this.locationKey+'?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke'
    ).subscribe(Response =>{
      console.log(Response)
    const forecastArray:object[]=[];
      for(const key in Response){
        if(Response.hasOwnProperty(key))
        forecastArray.push({...Response[key]});
      }            
      while(this.arrayCount < 5){
        this.maxTemp= this.convertToC(forecastArray[1][this.arrayCount].Temperature.Maximum.Value)
        this.minTemp= this.convertToC(forecastArray[1][this.arrayCount].Temperature.Minimum.Value)
        this.date = new Date(forecastArray[1][this.arrayCount].Date)
        this.newDate = this.datepipe.transform(this.date,'shortDate')
        this.day = this.date.getDay()
        this.arrayCount  = this.arrayCount+1
        console.log(this.newDate.getDay)


        this.store.dispatch(new WeatherDisplayActions.GetForecast({date:this.newDate,day:this.weekday[this.day],city:this.name,
          currentWeather: this.currWeather,
          maxTemp:this.maxTemp,
          minTemp:this.minTemp}))
  }
  this.hasBeenSearched = true
      this.arrayCount = 0;
})})}
convertToC(f:number){
  const c =Math.round((f - 32)*5/9);
  
  return c;
}
getCurrentWeatherOfTelAviv(){
  this.http.get(
       'https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke'
     ).subscribe(currrWeather => {
       console.log(currrWeather[0])
     this.weatherTelaviv = JSON.parse(currrWeather[0].Temperature.Metric.Value);
     this.convertToC(this.weatherTelaviv)
    
return this.weatherTelaviv;
     
})}

getFavoriteName(data:any){
  const that:Favorites[] = JSON.parse(localStorage.getItem('kk'))
  
  for(const x=0; x> that.length; x+1){
    const map =new Map(Object.entries(that[x].name))

  if(map == data){
    return true
    
  }
  }
}
autoSearch(event:any){
  this.store.dispatch(new WeatherDisplayActions.Reset)
  this.http.get(('https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke&q=' + event)
  ).subscribe(search =>{
    console.log(search)
    while(this.x < 10){
      this.name = search[this.x].LocalizedName
      this.store.dispatch(new WeatherDisplayActions.GetSearch({localName:this.name}))
      this.x =this.x+ 1 
    }       
    this.x=0
    console.log(this.store1) 


  })
  }
  addToFavorite(locationKey){
    this.name =locationKey;
     this.http.get(
      'https://dataservice.accuweather.com/locations/v1/cities/search?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke&q=' + this.name)
       .subscribe(posts =>{
        this.locationKey = JSON.parse(posts[0].Key); 
        this.http.get(
          'https://dataservice.accuweather.com/currentconditions/v1/' + this.locationKey +'?apikey=QB5lljlAw0wDn8G9ousWnGGEe7krSGke'
        ).subscribe(currrWeather => {
          console.log(currrWeather[0].Temperature)
          this.currentWeather = currrWeather[0].Temperature.Metric.Value
          console.log(this.currentWeather)
          //this.addFavorite.push(JSON.parse(localStorage.getItem('kk')))
          this.favorite = new Favorites(this.addFavorite.length+1,this.name,this.currentWeather)
          console.log(this.favorite)
          this.setFav(this.favorite)
         
 })
}

       )
}

}



 

