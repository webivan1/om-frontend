import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";
import {
  DonationFormType,
  DonationFormStateType,
  DonationResponseSuccessType
} from "./types";

const initialState: DonationFormStateType = {
  isOpenModal: false,
  loader: false,
  success: null,
  error: null,
};

export default createReducer(initialState, {
  [actions.openModal.type]: (state: DonationFormStateType) => {
    state.isOpenModal = true;
  },
  [actions.closeModal.type]: (state: DonationFormStateType) => {
    state.isOpenModal = false;
  },
  [actions.setLoader.type]: (state: DonationFormStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [actions.setError.type]: (state: DonationFormStateType, action: PayloadAction<string|null>) => {
    state.error = action.payload;
    state.success = null;
  },
  [actions.setSuccess.type]: (state: DonationFormStateType, action: PayloadAction<DonationResponseSuccessType>) => {
    state.success = action.payload;
    state.error = null;
  },
  [actions.setForm.type]: (state: DonationFormStateType, action: PayloadAction<DonationFormType>) => {
    state.form = action.payload;
  },
  [actions.reset.type]: (state: DonationFormStateType) => {
    state.success = null;
    state.error = null;
  },
});