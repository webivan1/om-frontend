import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as loginActions from "./actions";
import { LoginStateType } from "./types";

const initialState: LoginStateType = {
  loader: false,
  error: null,
  success: null,
  isShowModal: false
}

export default createReducer(initialState, {
  [loginActions.setLoader.type]: (state: LoginStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [loginActions.setError.type]: (state: LoginStateType, action: PayloadAction<string|null>) => {
    state.error = action.payload;
  },
  [loginActions.setSuccess.type]: (state: LoginStateType, action: PayloadAction<string|null>) => {
    state.success = action.payload;
  },
  [loginActions.showModal.type]: (state: LoginStateType) => {
    state.isShowModal = true;
  },
  [loginActions.hideModal.type]: (state: LoginStateType) => {
    state.isShowModal = false;
  }
});