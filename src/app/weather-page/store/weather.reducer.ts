import { WeatherDisplay } from '../weatherDisplay.model';
import * as WeatherDisplayActions from './weather.actions';
import { Action, INITIAL_STATE } from '@ngrx/store'
import { lastSearch } from '../last-search.model';
import { STATE_PROVIDERS } from '@ngrx/store/src/state';
import { Favorites } from '../favorite.model';
import { ForecastPageComponent } from '../forecast-page/forecast-page.component';

const initialSatate : WeatherDisplay={
    city:'',
    day:'',
    currentWeather:0,
    date:'',
    maxTemp:4,
    minTemp:3
     
}

const autoSearch : lastSearch[]=[{
    localName:''

}]

export function WeatherReducer(state :WeatherDisplay[] =[], action: WeatherDisplayActions.Actions){
    switch(action.type){
        case WeatherDisplayActions.GET_FORECAST:
        return [
            ...state,action.payload 
    ];
    
    case WeatherDisplayActions.RESET_ACTION:
            [
                INITIAL_STATE
           ]
           break
           
                
        
        default:return state;
    }

}
export function autoSearchLocation(state:lastSearch[]=[], action: WeatherDisplayActions.Actions){
    switch(action.type){
        case WeatherDisplayActions.GET_SEARCH:
        return [
           ...state, action.payload 
    ]


    case WeatherDisplayActions.RESET_ACTION:
            [
                INITIAL_STATE
                
           ]
           break
           
           
                
        
        default:return state;
    }
    

}
export function addToFavorite(state:Favorites[]=[], action: WeatherDisplayActions.Actions){
    switch(action.type){
        case WeatherDisplayActions.ADD_FAVORITE:
        return [
           ...state, action.payload 
    ]
    default:return state;
    }}