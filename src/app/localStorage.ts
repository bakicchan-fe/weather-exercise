import { RootState } from "./store";

export const loadState = () => {
  try {
    const savedState = localStorage.getItem("state");
    if (savedState === null) {
      return undefined;
    }
    return JSON.parse(savedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem("state", stringifiedState);
  } catch (err) {
    console.log(err);
  }
};
