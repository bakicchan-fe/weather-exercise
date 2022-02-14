import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import weatherReducer from "./reducer";

const preloadedState = loadState();

export const store = configureStore({
  reducer: weatherReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
