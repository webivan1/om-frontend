import { createAction } from "@reduxjs/toolkit";
import api from "../../../../api";

// Types
import { AppThunk } from "../../../store";
import { EventPublicListFilterType, EventPublicListType } from "./types";
import { EventListType } from "../../profile/list/types";

export const setToList = createAction<EventPublicListType>('event-list-public/set');
export const addToList = createAction<EventPublicListType>('event-list-public/add');
export const setLoader = createAction<boolean>('event-list-public/set-loader');
export const setError = createAction<string>('event-list-public/set-error');

export const loadListAsync = (
  page: number,
  merge: boolean,
  params: EventPublicListFilterType
): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  try {
    const data: EventListType = await api.public.events.list(page, params);

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