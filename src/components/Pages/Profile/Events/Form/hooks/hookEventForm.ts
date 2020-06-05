import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "../../../../../../services/moment";

// Types
import { RootState } from "../../../../../../store/store";
import { RegionsStateType } from "../../../../../../store/regions/list/types";
import { EventFormType } from "../../../../../../store/events/profile/types";

export const useEventForm = (defaultParams?: EventFormType) => {

  const { register, handleSubmit, errors } = useForm<EventFormType>({
    defaultValues: defaultParams || {}
  });

  const { regions } = useSelector<RootState, RegionsStateType>(state => state.regions);

  const minDate = moment(new Date).add(7, 'days')
    .set('hour', 13)
    .set('minute', 0);

  const [startDate, setStartDate] = useState<Date>(
    defaultParams ? new Date(defaultParams.startAt) : minDate.toDate()
  );

  const handleChangeDate = (date: Date) => {
    setStartDate(date);
  };

  const decoratorSubmit = (onSubmit: (data: EventFormType) => void): (data: EventFormType) => void => {
    return (data: EventFormType) => {
      onSubmit({
        ...data,
        startAt: startDate ? moment(startDate).format('YYYY-MM-DD HH:MM:SS') : ''
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    regions,
    startDate,
    minDate,
    handleChangeDate,
    decoratorSubmit
  }
}