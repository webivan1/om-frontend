import React, { RefObject, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMessageAsync } from "../../../store/chat/actions";

// Types
import { RootState } from "../../../store/store";
import { ChatStateType } from "../../../store/chat/types";

export const useMessageList = (container: RefObject<HTMLDivElement>) => {

  const dispatch = useDispatch();
  const { list, settings } = useSelector<RootState, ChatStateType>(state => state.chat);

  const onNextPage = () => {
    if (list.total > 0 && list.perPage > 0 && !list.loader) {
      const pages = Math.ceil(list.total / list.perPage);
      if (list.currentPage < pages) {
        dispatch(fetchListMessageAsync());
      }
    }
  };

  const onScrollTop = (el: HTMLDivElement) => {
    if (el.scrollTop === 0) {
      onNextPage();
    }
  }

  useEffect(() => {
    dispatch(fetchListMessageAsync());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      if (container.current) {
        container.current.addEventListener('scroll', onScrollTop.bind(null, container.current));
      }
    });

    return function cleanup() {
      if (container.current) {
        container.current.removeEventListener('scroll', onScrollTop.bind(null, container.current));
      }
    }
  }, [container])

  return list;
};