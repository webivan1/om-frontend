import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Types
import { EventFilterParamsType, EventListStateType } from "../../../../../store/events/profile/list/types";
import { RootState } from "../../../../../store/store";

// Actions
import { loadListAsync, removeEventAsync } from "../../../../../store/events/profile/list/actions";

export type HookEventListResponse = {
  eventList: EventListStateType & {
    lastPage: number
  };
  handleReloadList: () => void;
  handleChangePagination: (page: number) => void;
  handleNextPage: () => void;
  handleSearchForm: (data: EventFilterParamsType) => void;
  handleRemove: (id: number) => void;
};

export const useEventList = (): HookEventListResponse => {
  const dispatch = useDispatch();

  const eventList = useSelector<RootState, EventListStateType>(state => state.profileEventList);

  const lastPage = eventList.total ? Math.ceil(eventList.total / eventList.perPage) : 0;

  const handleReloadList = () => dispatch(loadListAsync(1, false, {}));
  const handleChangePagination = (page: number) => dispatch(loadListAsync(page, false));
  const handleNextPage = () => dispatch(loadListAsync(eventList.currentPage + 1, true));
  const handleSearchForm = (data: EventFilterParamsType) =>
    dispatch(loadListAsync(1, false, data));

  useEffect(() => {
    handleReloadList()
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(removeEventAsync(id));
  };

  return {
    eventList: { ...eventList, lastPage },
    handleReloadList,
    handleChangePagination,
    handleNextPage,
    handleSearchForm,
    handleRemove
  };
};