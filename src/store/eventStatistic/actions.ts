import { createAction } from "@reduxjs/toolkit";
import { EventStatisticType } from "./types";
import { AppThunk } from "../store";
import api from "../../api";

export const setLoader = createAction<boolean>('event-stat/set-loader');
export const setStat = createAction<EventStatisticType[]>('event-stat/set-list');
export const setError = createAction<string>('event-stat/set-error');
export const setMaxResult = createAction<number>('event-stat/set-max-result');

export const fetchEventStatAsync = (eventId: number): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  try {
    const rows: EventStatisticType[] = await api.public.events.stat(eventId);
    const maxResult = Math.max(...rows.map(row => row.total));
    dispatch(setStat(rows));
    dispatch(setMaxResult(maxResult));
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
}