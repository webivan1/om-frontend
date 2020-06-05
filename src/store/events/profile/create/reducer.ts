import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";

// Types
import { ProfileEventCreateFormState } from "./types";
import { EventType } from "../../types";

const initialState: ProfileEventCreateFormState = {
  loader: false,
  error: null,
  event: null,
};

export default createReducer(initialState, {
  [actions.setEvent.type]: (state: ProfileEventCreateFormState, action: PayloadAction<EventType|null>): void => {
    state.event = action.payload;
    state.error = null;
  },
  [actions.setLoader.type]: (state: ProfileEventCreateFormState, action: PayloadAction<boolean>): void => {
    state.loader = action.payload;
  },
  [actions.setError.type]: (state: ProfileEventCreateFormState, action: PayloadAction<string|null>): void => {
    state.error = action.payload;
  },
});