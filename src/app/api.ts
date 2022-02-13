import axios from "axios";
import { GetWeatherParams } from "../types";
import { makeUrl } from "../utils";

export const getWeatherApi = async (params: GetWeatherParams) => {
  const { coord } = params;
  return await axios
    .get(makeUrl(coord.lat, coord.lon))
    .then((response) => {
      const { id, coord, weather, name: value } = response.data;
      return { id, coord, weather, value };
    })
    .catch((e) => console.log(e));
};
