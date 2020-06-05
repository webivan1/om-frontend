import { createAction } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";
import { AppThunk } from "../store";
import { NotificationType, NotificationTypes } from "./types";

export const removeNotify = createAction<string>('notify/remove');
export const addNotify = createAction<NotificationType>('notify/add');

export const registerNotification = (
  type: keyof typeof NotificationTypes,
  description: string,
  title?: string
): AppThunk => dispatch => {
  const notification: NotificationType = {
    id: uuid4(),
    type,
    title,
    description
  }

  dispatch(addNotify(notification));
}