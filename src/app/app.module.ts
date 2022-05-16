import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { appRoutes } from "./routes";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { AccuWeatherService } from './accu-weather.service';
import { WeatherDisplayComponent } from './weather-page/weather-display/weather-display.component';
import { ForecastPageComponent } from './weather-page/forecast-page/forecast-page.component';
import { StoreModule } from '@ngrx/store';
import { WeatherReducer, autoSearchLocation, addToFavorite } from './weather-page/store/weather.reducer';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WeatherPageComponent,
    WeatherDisplayComponent,
    ForecastPageComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyDFNhM3j4FaUnkNQ3-QLo5VQtAqg1mHjmo',
  libraries:['places']}),
    StoreModule.forRoot({weatherDisp:WeatherReducer,searchLoc:autoSearchLocation, favorite:addToFavorite})
  ],
  providers: [AccuWeatherService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
