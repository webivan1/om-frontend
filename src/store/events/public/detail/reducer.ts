import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as eventDetailActions from "./actions";

import { EventDetailStateType } from "./types";
import { EventType } from "../../types";

const initialState: EventDetailStateType = {
  loader: false,
  detail: null,
  error: null
};

export default createReducer(initialState, {
  [eventDetailActions.setDetail.type]: (state: EventDetailStateType, action: PayloadAction<EventType>) => {
    state.error = null;
    state.detail = action.payload;
  },
  [eventDetailActions.setError.type]: (state: EventDetailStateType, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.detail = null;
  },
  [eventDetailActions.setLoader.type]: (state: EventDetailStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [eventDetailActions.resetDetail.type]: (state: EventDetailStateType) => {
    state.detail = null;
  },
});