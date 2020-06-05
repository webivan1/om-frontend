import React from "react";
import { useDispatch } from "react-redux";
import { NotificationTypes } from "../../../store/notification/types";
import { registerNotification, removeNotify } from "../../../store/notification/actions";

export const useNotification = () => {
  const dispatch = useDispatch();

  const add = (
    type: keyof typeof NotificationTypes,
    description: string,
    title?: string
  ) => {
    dispatch(registerNotification(type, description, title));
  }

  const remove = (id: string) => {
    dispatch(removeNotify(id));
  }

  return { add, remove };
}