import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "../../../../../services/moment";

// Types
import { RootState } from "../../../../../store/store";
import { RegionsStateType } from "../../../../../store/regions/list/types";
import { EventFilterParamsType, EventListStateType } from "../../../../../store/events/profile/list/types";
import { FormContextValues } from "react-hook-form/dist/contextTypes";
import { RegionType } from "../../../../../store/regions/types";

export type HookEventFormSearchResponse = {
  hookForm: FormContextValues<EventFilterParamsType>;
  regions: RegionType[];
  startDate: Date|null;
  handleChangeDate: (date: Date|null) => void;
  decoratorSubmit: (onSubmit: (data: EventFilterParamsType) => void) => (data: EventFilterParamsType) => void;
};

export const useEventFormSearch = (): HookEventFormSearchResponse => {

  const { regions } = useSelector<RootState, RegionsStateType>(state => state.regions);
  const { form } = useSelector<RootState, EventListStateType>(state => state.profileEventList);

  const hookForm = useForm<EventFilterParamsType>({
    defaultValues: form
  });

  useEffect(() => {
    hookForm.reset(form);
  }, [form]);

  const [startDate, setStartDate] = useState<Date|null>(form.startDate ? new Date(form.startDate) : null);

  const handleChangeDate = (date: Date|null) => {
    setStartDate(date);
  };

  const decoratorSubmit = (onSubmit: (data: EventFilterParamsType) => void): (data: EventFilterParamsType) => void => {
    return (data: EventFilterParamsType) => {
      onSubmit({
        ...data,
        startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : ''
      });
    }
  };

  return {
    hookForm,
    regions,
    startDate,
    handleChangeDate,
    decoratorSubmit
  };
};