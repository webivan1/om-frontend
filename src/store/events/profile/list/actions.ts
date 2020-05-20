import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import { EventFilterParamsType, EventListType } from "./types";
import StorageToken from "../../../user/StorageToken";
import api from "../../../../api";

export const setToList = createAction<EventListType>('event-list-profile/set');
export const addToList = createAction<EventListType>('event-list-profile/add');
export const setLoader = createAction<boolean>('event-list-profile/set-loader');
export const setError = createAction<string>('event-list-profile/set-error');
export const setSearchForm = createAction<EventFilterParamsType>('event-list-profile/set-search-form');

export const loadListAsync = (
  page: number,
  merge: boolean,
  data?: EventFilterParamsType
): AppThunk => async (dispatch, getState) => {
  dispatch(setLoader(true));

  if (data) {
    dispatch(setSearchForm(data));
  }

  const searchForm = getState().profileEventList.form || {};

  const storage = new StorageToken();
  const token = storage.getToken();
  const userId = storage.getUserId();

  try {
    if (!token || !userId) {
      throw new Error('403');
    }

    const data: EventListType = await api.profile.events.list({ token, userId }, page, searchForm);

    if (merge) {
      dispatch(addToList(data));
    } else {
      dispatch(setToList(data));
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
};