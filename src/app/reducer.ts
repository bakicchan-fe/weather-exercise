import { WeatherState } from "../types";
import { DELETE_RECORD, EDIT_RECORD, STORE_WEATHER } from "./actions";

const initialState: WeatherState = {
  weatherData: [],
};

const weatherReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case STORE_WEATHER:
      return {
        ...state,
        weatherData: [...state.weatherData, payload],
      };
    case EDIT_RECORD:
      const indexToEdit = state.weatherData.findIndex(
        (weather) => weather.id === payload.id
      );

      const newWeatherArray = [...state.weatherData];
      newWeatherArray[indexToEdit] = payload;

      return {
        ...state,
        weatherData: newWeatherArray,
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
