import { createReducer, PayloadAction } from "@reduxjs/toolkit";

// Actions
import * as regionListActions from "./actions";

// Types
import { RegionsStateType } from "./types";
import { RegionType } from "../types";

const initialState: RegionsStateType = {
  fetchLoader: false,
  regions: []
};

export default createReducer(initialState, {
  [regionListActions.setLoader.type]: (state: RegionsStateType, action: PayloadAction<boolean>): void => {
    state.fetchLoader = action.payload;
  },
  [regionListActions.setList.type]: (state: RegionsStateType, action: PayloadAction<RegionType[]>): void => {
    state.regions = action.payload;
  }
});