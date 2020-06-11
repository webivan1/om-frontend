import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { ChatFormStateType } from "./types";

const initialState: ChatFormStateType = {
  loader: false,
  error: null,
  lastMessage: null
};

export default createReducer(initialState, {
  [actions.setLoader.type]: (state: ChatFormStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [actions.setError.type]: (state: ChatFormStateType, action: PayloadAction<string|null>) => {
    state.error = action.payload;
  },
  [actions.setLastMessage.type]: (state: ChatFormStateType, action: PayloadAction<string>) => {
    state.lastMessage = action.payload;
  }
});