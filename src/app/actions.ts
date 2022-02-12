import { WeatherInfo } from "../types";

export const STORE_WEATHER = "STORE_WEATHER_DATA";
export const DELETE_RECORD = "DELETE_RECORD";

export const storeWeather = (payload: WeatherInfo) => ({
  type: STORE_WEATHER,
  payload,
});

export const deleteRecord = (payload: number) => ({
  type: DELETE_RECORD,
  payload,
});
