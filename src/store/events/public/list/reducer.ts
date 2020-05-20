import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { EventPublicListStateType, EventPublicListType } from "./types";
import * as eventListActions from "./actions";

const initialState: EventPublicListStateType = {
  total: 0,
  items: [],
  currentPage: 1,
  perPage: 0,
  loader: false,
  error: null
}

export default createReducer(initialState, {
  [eventListActions.setLoader.type]: (state: EventPublicListStateType, action: PayloadAction<boolean>) => {
    state.loader = action.payload;
  },
  [eventListActions.setError.type]: (state: EventPublicListStateType, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  [eventListActions.setToList.type]: (state: EventPublicListStateType, action: PayloadAction<EventPublicListType>) => {
    state.items = action.payload.items;
    state.currentPage = action.payload.currentPage;
    state.perPage = action.payload.perPage;
    state.total = action.payload.total;
  },
  [eventListActions.addToList.type]: (state: EventPublicListStateType, action: PayloadAction<EventPublicListType>) => {
    state.items = state.items.concat(action.payload.items);
    state.currentPage = action.payload.currentPage;
    state.perPage = action.payload.perPage;
    state.total = action.payload.total;
  }
})