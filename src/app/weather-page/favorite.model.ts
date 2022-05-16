export class Favorites{
    id:number;
    name:String;
    currentWeather:any;
    constructor(id:number, name:String, currentWeather:any){
        this.id=id;
        this.name=name;
        this.currentWeather = currentWeather;
    }

}