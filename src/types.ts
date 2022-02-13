export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
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
  error?: boolean;
}

export interface GetWeatherParams {
  coord: Coord;
  id: number;
  value: string;
}

export type WeatherState = {
  weatherData: Array<WeatherInfo>;
};
