import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { NotificationStateType, NotificationType } from "./types";

const initialState: NotificationStateType = {
  notifications: []
};

export default createReducer(initialState, {
  [actions.addNotify.type]: (state: NotificationStateType, action: PayloadAction<NotificationType>): void => {
    state.notifications.push(action.payload);
  },
  [actions.removeNotify.type]: (state: NotificationStateType, action: PayloadAction<string>): void => {
    state.notifications.splice(
      state.notifications.findIndex(({ id }) => id === action.payload), 1
    );
  }
});