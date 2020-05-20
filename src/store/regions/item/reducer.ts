import { createReducer, PayloadAction } from "@reduxjs/toolkit";

// Actions
import * as regionActions from "./actions";

// Types
import { RegionStateType } from "./types";
import { RegionType } from "../types";

const initialState: RegionStateType = {
  region: null
};

export default createReducer(initialState, {
  [regionActions.setItem.type]: (state: RegionStateType, action: PayloadAction<RegionType>): void => {
    state.region = action.payload;
  }
});