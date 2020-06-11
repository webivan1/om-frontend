import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { ChatStateType, MessagesType, MessageType } from "./types";

const initialState: ChatStateType = {
  settings: {
    isOpen: false,
    newMessages: 0
  },
  list: {
    loader: false,
    error: null,
    total: 0,
    items: [],
    currentPage: 0,
    perPage: 0
  }
};

export default createReducer({...initialState}, {
  [actions.chatOpen.type]: (state: ChatStateType) => {
    state.settings.isOpen = true;
  },
  [actions.chatClose.type]: (state: ChatStateType) => {
    state.settings.isOpen = false;
  },

  // listing
  [actions.setLoader.type]: (state: ChatStateType, action: PayloadAction<boolean>) => {
    state.list.loader = action.payload;
  },
  [actions.setError.type]: (state: ChatStateType, action: PayloadAction<string|null>) => {
    state.list.error = action.payload;
  },
  [actions.setMessages.type]: (state: ChatStateType, action: PayloadAction<MessagesType>) => {
    state.list.items = action.payload.items.concat(state.list.items);
    state.list.currentPage = action.payload.currentPage;
    state.list.perPage = action.payload.perPage;
    state.list.total = action.payload.total;
  },
  [actions.addMessage.type]: (state: ChatStateType, action: PayloadAction<MessageType>) => {
    state.list.items.push(action.payload);
  },

  [actions.chatReset.type]: (state: ChatStateType) => {
    state = {...initialState}
  }
});