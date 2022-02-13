export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  _id: number;
  value: string;
  country: string;
  coord: Coord;
}

export interface WeatherInfo {
  id: number;
  value: string;
  coord: Coord;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
}

export type WeatherState = {
  weatherData: Array<WeatherInfo>;
};
