import { WeatherInfo } from "../types";
import { processApiCall } from "../utils";
import { getWeatherApi } from "./api";

export const RETRIEVE_WEATHER = "RETRIEVE_WEATHER";
export const STORE_WEATHER = "STORE_WEATHER_DATA";
export const DELETE_RECORD = "DELETE_RECORD";

export const retrieveWeather = processApiCall({
  apiCall: (params: any) => getWeatherApi(params),
  successAction: STORE_WEATHER,
});

export const storeWeather = (payload: WeatherInfo) => ({
  type: STORE_WEATHER,
  payload,
});

export const deleteRecord = (payload: number) => ({
  type: DELETE_RECORD,
  payload,
});
