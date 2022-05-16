import { Action, INITIAL_STATE } from '@ngrx/store'
import { WeatherDisplay } from '../weatherDisplay.model';
import { _initialStateFactory } from '@ngrx/store/src/store_module';
import { lastSearch } from '../last-search.model';
import { Favorites } from '../favorite.model';


export const GET_FORECAST = 'GET_FORECAST';
export const RESET_ACTION = "RESET";
export const GET_SEARCH = "GET_SEARCH"
export const UPDATE_SEARCH = "UPDATE_SEARCH"
export const ADD_FAVORITE = "ADD_FAVORITE"
  

export class GetForecast implements Action{
    readonly type = GET_FORECAST;
    constructor(public payload:WeatherDisplay){

    }
}


export class Reset implements Action{
    readonly type = RESET_ACTION;
    constructor(){

    }
}
export class GetSearch implements Action{
    readonly type = GET_SEARCH;
    constructor(public payload:lastSearch){

    }
}
export class AddToFavorite implements Action{
    readonly type = ADD_FAVORITE;
    constructor(public payload:Favorites){

    }
}


export type Actions = GetForecast | Reset | GetSearch | AddToFavorite;
