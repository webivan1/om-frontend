import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DonationFormStateType, DonationFormType } from "../../../store/donation/types";
import { EventDetailStateType } from "../../../store/events/public/detail/types";
import { createInvoiceAsync } from "../../../store/donation/actions";

export const useDonation = () => {

  const dispatch = useDispatch();

  const { loader, error, success, form } = useSelector<RootState, DonationFormStateType>(state => state.donation);
  const { detail } = useSelector<RootState, EventDetailStateType>(state => state.publicEventDetail);

  const handleSubmit = (form: DonationFormType) => {
    dispatch(createInvoiceAsync(form));
  }

  return {
    event: detail,
    defaultValues: form,
    loader,
    error,
    success,
    handleSubmit
  };
};