import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { UserStateType } from "../../../store/user/types";
import { EventDetailStateType } from "../../../store/events/public/detail/types";
import UserModel from "../../../store/user/models/UserModel";
import { ChatStateType } from "../../../store/chat/types";

export const useChat = () => {
  const { user } = useSelector<RootState, UserStateType>(state => state.user);
  const { detail } = useSelector<RootState, EventDetailStateType>(state => state.publicEventDetail);
  const { settings } = useSelector<RootState, ChatStateType>(state => state.chat);

  const [canWriteChat, setWriteChat] = useState<boolean>(false);

  useEffect(() => {
    if (user && detail) {
      const model: UserModel|undefined = UserModel.call();
      if (model && model.canUseChatEvent(detail)) {
        setWriteChat(true);
      }
    }
  }, [user]);

  return {
    canWriteChat,
    settings
  }
};