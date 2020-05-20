import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EventFilterParamsType, EventListStateType, EventListType } from "./types";
import * as eventListActions from "./actions";

const initialState: EventListStateType = {
  loader: false,
  error: null,
  items: [],
  total: 0,
  currentPage: 1,
  perPage: 0,
  form: {}
};

export default createReducer(initialState, {
  [eventListActions.setLoader.type]: (state: EventListStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [eventListActions.setError.type]: (state: EventListStateType, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  [eventListActions.setToList.type]: (state: EventListStateType, action: PayloadAction<EventListType>) => {
    state.items = action.payload.items;
    state.currentPage = action.payload.currentPage;
    state.perPage = action.payload.perPage;
    state.total = action.payload.total;
  },
  [eventListActions.addToList.type]: (state: EventListStateType, action: PayloadAction<EventListType>) => {
    state.items = state.items.concat(action.payload.items);
    state.currentPage = action.payload.currentPage;
    state.perPage = action.payload.perPage;
    state.total = action.payload.total;
  },
  [eventListActions.setSearchForm.type]: (state: EventListStateType, action: PayloadAction<EventFilterParamsType>) => {
    state.form = {...action.payload};
  }
});