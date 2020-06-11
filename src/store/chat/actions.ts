import { createAction } from "@reduxjs/toolkit";
import { MessagesType, MessageType } from "./types";
import { AppThunk } from "../store";
import api from "../../api";

// settings
export const chatOpen = createAction('chat/open');
export const chatClose = createAction('chat/close');

// Reset
export const chatReset = createAction('chat/reset');

// Listing
export const setLoader = createAction<boolean>('chat/set-loader');
export const setError = createAction<string|null>('chat/set-error');
export const setMessages = createAction<MessagesType>('chat/set-messages');
export const addMessage = createAction<MessageType>('chat/add-message');

export const fetchListMessageAsync = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoader(true));
  try {
    const page = getState().chat.list.currentPage + 1;
    const eventId: number|undefined = getState().publicEventDetail.detail?.id;
    if (!eventId) {
      throw new Error('No opened event page');
    }
    const response = await api.public.chat.message(eventId, page);
    dispatch(setMessages(response));
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
}