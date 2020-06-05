import { createAction } from "@reduxjs/toolkit";
import api from "../../../../api";
import StorageToken from "../../../user/StorageToken";

// Types
import { AppThunk } from "../../../store";
import { EventFormType } from "../types";
import { EventFormStatuses } from "./types";
import { EventType } from "../../types";

export const setLoader = createAction<boolean>('profile-event-create/set-loader');
export const setError = createAction<string|null>('profile-event-create/set-error');
export const setEvent = createAction<EventType|null>('profile-event-create/set-event');

export const createEventAsync = (form: EventFormType): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  const storage = new StorageToken();
  const token = storage.getToken();
  const userId = storage.getUserId();

  try {
    if (!token || !userId) {
      throw new Error('403');
    }

    const response = await api.profile.events.create({ token, userId }, form);

    if (response.status === EventFormStatuses.success) {
      dispatch(setEvent(response.event));
    } else {
      throw new Error(response.message);
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
}