import { createAction } from "@reduxjs/toolkit";
import api from "../../../../api";

// Types
import { EventType } from "../../types";
import { AppThunk } from "../../../store";
import { EventDetailStatuses } from "./types";

export const setDetail = createAction<EventType>('event-detail/set-detail');
export const setError = createAction<string>('event-detail/set-error');
export const setLoader = createAction<boolean>('event-detail/set-loader');

export const fetchDetailAsync = (id: number): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  try {
    const response = await api.public.events.detail(id);

    if (response.status === EventDetailStatuses.success) {
      dispatch(setDetail(response.detail));
    } else {
      dispatch(setError(response.message));
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
}