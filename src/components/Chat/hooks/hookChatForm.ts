import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ChatFormStateType } from "../../../store/chatForm/types";
import { useNotification } from "../../Notification/hooks/hookNotification";
import { sendMessageAsync } from "../../../store/chatForm/actions";

export const useChatForm = () => {

  const dispatch = useDispatch();
  const { loader, error } = useSelector<RootState, ChatFormStateType>(state => state.chatForm);
  const { add } = useNotification();

  useEffect(() => {
    if (error) {
      add('danger', error);
    }
  }, [error]);

  const handlerSubmit = async (message: string) => {
    if (message) {
      await dispatch(sendMessageAsync(message));
    }
  }

  return { loader, handlerSubmit };
}