import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";

// Types
import { ProfileEventUpdateFormState } from "./types";
import { EventType } from "../../types";

const initialState: ProfileEventUpdateFormState = {
  form: {
    loader: false,
    error: null,
    success: null,
  },
  detail: {
    loader: false,
    error: null,
    event: null,
  }
};

export default createReducer(initialState, {
  [actions.setDetail.type]: (state: ProfileEventUpdateFormState, action: PayloadAction<EventType>): void => {
    state.detail = {
      loader: false,
      error: null,
      event: action.payload
    };
  },
  [actions.setLoaderDetail.type]: (state: ProfileEventUpdateFormState, action: PayloadAction<boolean>): void => {
    state.detail.loader = action.payload;
  },
  [actions.setDetailError.type]: (state: ProfileEventUpdateFormState, action: PayloadAction<string|null>): void => {
    state.detail.error = action.payload;
  },
  [actions.setFormError.type]: (state: ProfileEventUpdateFormState, action: PayloadAction<string|null>): void => {
    state.form.error = action.payload;
  },
  [actions.setFormLoader.type]: (state: ProfileEventUpdateFormState, action: PayloadAction<boolean>): void => {
    state.form.loader = action.payload;
  },
  [actions.setFormSuccess.type]: (state: ProfileEventUpdateFormState, action: PayloadAction<string|null>): void => {
    state.form.success = action.payload;
  },
});