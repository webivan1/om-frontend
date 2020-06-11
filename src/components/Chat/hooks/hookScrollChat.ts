import React, { RefObject, useEffect } from "react";
import { useSelector } from "react-redux";

// Types
import { RootState } from "../../../store/store";
import { ChatStateType } from "../../../store/chat/types";

export const useScrollChat = (container: RefObject<HTMLDivElement>): void => {
  const { list, settings } = useSelector<RootState, ChatStateType>(state => state.chat);

  const toBottomPosition = (el: HTMLDivElement|null) => {
    setTimeout(() => {
      if (el) {
        el.scrollTo(0, el.scrollHeight);
      }
    });
  }

  useEffect(() => {
    toBottomPosition(container.current);
  }, [container, settings]);

  useEffect(() => {
    if (container.current) {
      const bottomPosition: number = container.current.offsetHeight + container.current.scrollTop;
      const isBottom: boolean = bottomPosition === container.current.scrollHeight;

      if (isBottom) {
        toBottomPosition(container.current);
      }
    }
  }, [list.items]);
}