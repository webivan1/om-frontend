import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import StorageToken from "../user/StorageToken";
import api from "../../api";

// Listing
export const setLoader = createAction<boolean>('chat-form/set-loader');
export const setError = createAction<string|null>('chat-form/set-error');
export const setLastMessage = createAction<string>('chat-form/set-last-message');

export const sendMessageAsync = (message: string): AppThunk => async (dispatch, getState) => {
  dispatch(setLoader(true));

  const storage = new StorageToken();
  const token = storage.getToken();
  const userId = storage.getUserId();

  try {
    const page = getState().chat.list.currentPage + 1;
    const eventId: number|undefined = getState().publicEventDetail.detail?.id;

    if (!token || !userId || !eventId) {
      throw new Error('403');
    }

    await api.public.chat.create({ token, userId }, eventId, message);
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
}