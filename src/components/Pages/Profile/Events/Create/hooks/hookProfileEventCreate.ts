import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ProfileEventCreateFormState } from "../../../../../../store/events/profile/create/types";
import { EventFormType } from "../../../../../../store/events/profile/types";
import { createEventAsync, setEvent } from "../../../../../../store/events/profile/create/actions";

export const useProfileEventCreate = () => {

  const {
    loader,
    error,
    event
  } = useSelector<RootState, ProfileEventCreateFormState>(state => state.profileEventCreate);

  const dispatch = useDispatch();

  const submitHandler = (form: EventFormType) => {
    dispatch(createEventAsync(form));
  };

  useEffect(() => {
    return function cleanup() {
      dispatch(setEvent(null));
    }
  }, [dispatch]);

  return {
    loader,
    error,
    event,
    submitHandler
  };
};