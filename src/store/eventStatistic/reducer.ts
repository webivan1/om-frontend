import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EventStatisticStateType, EventStatisticType } from "./types";
import * as eventStatActions from "./actions";

const initialState: EventStatisticStateType = {
  rows: [],
  loader: false,
  totalMax: 0,
  error: null,
}

export default createReducer(initialState, {
  [eventStatActions.setStat.type]: (state: EventStatisticStateType, action: PayloadAction<EventStatisticType[]>) => {
    state.error = null;
    state.rows = action.payload;
  },
  [eventStatActions.setError.type]: (state: EventStatisticStateType, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  [eventStatActions.setLoader.type]: (state: EventStatisticStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [eventStatActions.setMaxResult.type]: (state: EventStatisticStateType, action: PayloadAction<number>) => {
    state.totalMax = action.payload;
  },
});