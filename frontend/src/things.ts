import type { Dayjs } from "dayjs";
import type { METJSONForecast } from "./api/gen/met";

export class WeekendData{
  days: DailyWeatherData[];
  weatherSpot: ManualWeatherSpot;

  constructor(days: DailyWeatherData[], weatherSpot: ManualWeatherSpot){
    this.days = days;
    this.weatherSpot = weatherSpot
  }

  get totalScore(){
    return this.days.reduce((prev, curr) => prev + curr.score, 0);
  }

  get rainMin(){
    return Math.min.apply(Math, this.days.map(w => w.percipitationMin));
  }

  get rainMax(){
    return Math.max.apply(Math, this.days.map(w => w.percipitationMax));
  }

  get totalRainMax(){
    return this.days.reduce((prev, curr) => prev + curr.percipitationMax, 0);
  }

  get totalRainMin(){
    return this.days.reduce((prev, curr) => prev + curr.percipitationMin, 0);
  }

  get tempMin(){
    return Math.min.apply(Math, this.days.map(w => w.tempMin));
  }

  get tempMax(){
    return  Math.max.apply(Math, this.days.map(w => w.tempMax));
  }
}


export type DailyWeatherData = {
  dateString: string;
  percipitationMin: number;
  percipitationMax: number;
  weightedPercipitationMin: number;
  weightedPercipitationMax: number;
  wind: number;
  windMax: number;
  tempMin: number;
  tempMax: number;
  score: number;
}

export type ManualWeatherSpot = {
  lat: number;
  lng: number;
  description: string;
  weatherData?: METJSONForecast;
  leafletMarker?: L.Marker<any>;
  dailyWeatherData?: DailyWeatherData[];
}

export type DailyData = {
  dayjs: Dayjs;
  dailyWeatherData?: DailyWeatherData;
}

export const rainBlue = "#134686"
export const warmColor = "#ED3F27"
export const coldColor = "#1767ce"