import axios from "axios";
import { makeUrl } from "../utils";

export const getWeatherApi = async (params: any) => {
  return await axios
    .get(makeUrl(params.lat, params.lon))
    .then((response) => {
      const { id, coord, weather, name: value } = response.data;
      return { id, coord, weather, value };
    })
    .catch((e) => console.log(e));
};
