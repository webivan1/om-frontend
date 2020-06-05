import { createAction } from "@reduxjs/toolkit";
import api from "../../../../api";
import StorageToken from "../../../user/StorageToken";

// Types
import { AppThunk } from "../../../store";
import { EventFormType } from "../types";
import { EventFormStatuses } from "./types";
import { EventType } from "../../types";

export const setLoaderDetail = createAction<boolean>('profile-event-update/set-loader-detail');
export const setDetail = createAction<EventType>('profile-event-update/set-detail');
export const setDetailError = createAction<string|null>('profile-event-update/set-detail-error');

export const setFormLoader = createAction<boolean>('profile-event-update/set-form-loader');
export const setFormError = createAction<string|null>('profile-event-update/set-form-error');
export const setFormSuccess = createAction<string|null>('profile-event-update/set-form-success');

export const fetchDetailAsync = (id: number): AppThunk => async dispatch => {
  dispatch(setLoaderDetail(true));

  const storage = new StorageToken();
  const token = storage.getToken();
  const userId = storage.getUserId();

  try {
    if (!token || !userId) throw new Error('403');
    const event: EventType = await api.profile.events.detail({ token, userId }, id);
    dispatch(setDetail(event));
  } catch (e) {
    dispatch(setDetailError(e.message));
  } finally {
    dispatch(setLoaderDetail(false));
  }
}

export const updateEventAsync = (id: number, form: EventFormType): AppThunk => async dispatch => {
  dispatch(setFormLoader(true));

  const storage = new StorageToken();
  const token = storage.getToken();
  const userId = storage.getUserId();

  try {
    if (!token || !userId) throw new Error('403');

    const response = await api.profile.events.update({ token, userId }, id, form);

    if (response.status === EventFormStatuses.success) {
      dispatch(setFormSuccess('Вы успешно обновили событие'));
      dispatch(setDetail(response.event));
    } else throw new Error(response.message);
  } catch (e) {
    dispatch(setFormError(e.message));
  } finally {
    dispatch(setFormLoader(false));
  }
}