import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../../../store/store";
import { ProfileEventUpdateFormState } from "../../../../../../store/events/profile/update/types";
import { fetchDetailAsync, updateEventAsync, setDetailError } from "../../../../../../store/events/profile/update/actions";
import { EventFormType } from "../../../../../../store/events/profile/types";
import { setEvent } from "../../../../../../store/events/profile/create/actions";

type RouteParamsType = {
  id: string;
};

type HookProfileEventUpdateType = ProfileEventUpdateFormState & {
  submitHandler: (form: EventFormType) => void;
}

export const useProfileEventUpdate = (): HookProfileEventUpdateType => {

  const dispatch = useDispatch();
  const { id } = useParams<RouteParamsType>();

  const { detail, form } = useSelector<RootState, ProfileEventUpdateFormState>(state => state.profileEventUpdate);

  useEffect(() => {
    dispatch(fetchDetailAsync(+id));

    return function cleanup() {
      dispatch(setDetailError(null));
    }
  }, [dispatch]);

  const submitHandler = (form: EventFormType) => {
    dispatch(updateEventAsync(+id, form));
  }

  return {
    detail,
    form,
    submitHandler
  };
};