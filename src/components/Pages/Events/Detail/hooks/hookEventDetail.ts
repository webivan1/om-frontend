import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { EventDetailStateType } from "../../../../../store/events/public/detail/types";
import { fetchDetailAsync, resetDetail } from "../../../../../store/events/public/detail/actions";
import { useParams } from "react-router-dom";
import { RouteParamsType } from "../types";

export type HookEventDetailType = EventDetailStateType;

export const useEventDetail = (): HookEventDetailType => {

  const dispatch = useDispatch();
  const { id } = useParams<RouteParamsType>();
  const { loader, error, detail } = useSelector<RootState, EventDetailStateType>(state => state.publicEventDetail);

  useEffect(() => {
    dispatch(fetchDetailAsync(+id));

    return () => {
      dispatch(resetDetail());
    }
  }, [dispatch]);

  return {
    loader,
    error,
    detail
  };
};