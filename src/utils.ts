import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "./app/store";
import { OW_APIKEY, OW_BASEURL } from "./data/config";

export const lowerCaseText = (text: string) => text.toLowerCase();

// Make the URL with the given params
export const makeUrl = (lat: number, lon: number) =>
  `${OW_BASEURL}?lat=${lat}&lon=${lon}&appid=${OW_APIKEY}`;

// Make the api call and process the response
export const processApiCall = ({ apiCall, successAction }: any) => {
  return (params = {}) =>
    async (dispatch: Dispatch, getState: () => RootState) => {
      try {
        let result = await apiCall(params);

        if (successAction) {
          dispatch({
            type: successAction,
            payload: result,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
};
