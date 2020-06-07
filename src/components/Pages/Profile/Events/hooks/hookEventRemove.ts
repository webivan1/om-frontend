import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Types

// Actions
import { removeEventAsync } from "../../../../../store/events/profile/list/actions";

export type HookEventRemoveResponse = {
  handleRemove: (id: number) => void;
};

export const useEventRemove = (): HookEventRemoveResponse => {
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeEventAsync(id));
  };

  return { handleRemove };
};