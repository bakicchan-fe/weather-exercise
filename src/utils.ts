import { OW_APIKEY, OW_BASEURL } from "./data/config";

export const lowerCaseText = (text: string) => text.toLowerCase();

export const makeUrl = (lat: number, lon: number) =>
  `${OW_BASEURL}?lat=${lat}&lon=${lon}&appid=${OW_APIKEY}`;
