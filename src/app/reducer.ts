import { WeatherState } from "../types";
import { DELETE_RECORD, STORE_WEATHER } from "./actions";

const initialState: WeatherState = {
  weatherData: [],
};

const weatherReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case STORE_WEATHER:
      return {
        ...state,
        weatherData: [...state.weatherData, payload],
      };
    case DELETE_RECORD:
      return {
        ...state,
        weatherData: state.weatherData.filter(
          (weather: any) => weather.id !== payload
        ),
      };
  }
  return state;
};

export default weatherReducer;