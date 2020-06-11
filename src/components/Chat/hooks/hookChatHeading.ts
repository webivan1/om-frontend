import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatClose, chatOpen } from "../../../store/chat/actions";

// Types
import { RootState } from "../../../store/store";
import { ChatStateType } from "../../../store/chat/types";

export const useChatHeading = () => {

  const dispatch = useDispatch();
  const { settings } = useSelector<RootState, ChatStateType>(state => state.chat);

  const toggleChat = () => {
    dispatch(settings.isOpen ? chatClose() : chatOpen());
  }

  return {
    toggleChat,
    settings
  };
};