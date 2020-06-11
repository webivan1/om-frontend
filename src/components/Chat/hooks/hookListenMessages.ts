import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Echo } from "../../../services/echo/echo.service";
import { addMessage } from "../../../store/chat/actions";

// Types
import { RootState } from "../../../store/store";
import { EventDetailStateType } from "../../../store/events/public/detail/types";
import { MessageType } from "../../../store/chat/types";

export const useListenMessages = (): void => {
  const dispatch = useDispatch();
  const { detail } = useSelector<RootState, EventDetailStateType>(state => state.publicEventDetail);

  useEffect(() => {
    const channelName = `event-${detail?.id}`;

    Echo.channel(channelName)
      .listen('new-message', (message: MessageType) => {
        dispatch(addMessage(message));
      });

    return function cleanup() {
      Echo.leave(channelName);
    }
  }, [dispatch]);
}