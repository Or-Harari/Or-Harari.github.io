import { Routes } from "@angular/router";
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { ForecastPageComponent } from './weather-page/forecast-page/forecast-page.component';

export const appRoutes : Routes = [
    {path:'',component:WeatherPageComponent},
    {path:'home' , component: WeatherPageComponent},
    {path:'favorite', component:ForecastPageComponent}
];