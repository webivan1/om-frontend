import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Types
import { RootState } from "../../../../../store/store";
import { RegionStateType } from "../../../../../store/regions/item/types";
import { EventPublicListStateType } from "../../../../../store/events/public/list/types";
import { RegionType } from "../../../../../store/regions/types";

// Actions
import { loadListAsync } from "../../../../../store/events/public/list/actions";

export type HookEventListType = {
  list: EventPublicListStateType;
  lastPage: number;
  region: RegionType|null,
  handleReloadList: () => void;
  handleNextPage: (page: number) => void;
  handleMoreList: () => void;
};

export const useEventList = (): HookEventListType => {

  const dispatch = useDispatch();

  const { region } = useSelector<RootState, RegionStateType>(state => state.region);
  const list = useSelector<RootState, EventPublicListStateType>(state => state.publicEventList);

  const params = { region: region?.id };

  useEffect(() => {
    if (region) {
      dispatch(loadListAsync(1, false, params));
    }
  }, [region]);

  const handleReloadList = () => dispatch(loadListAsync(1, false, params));
  const handleNextPage = (page: number) => dispatch(loadListAsync(page, false, params));
  const handleMoreList = () => dispatch(loadListAsync(list.currentPage + 1, true, params));

  const lastPage: number = Math.ceil(list.total / list.perPage);

  return {
    list,
    lastPage,
    region,
    handleReloadList,
    handleNextPage,
    handleMoreList
  };
};