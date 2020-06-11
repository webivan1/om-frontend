import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DonationFormStateType } from "../../../store/donation/types";
import { closeModal, openModal } from "../../../store/donation/actions";

export const useDonationModal = () => {
  const dispatch = useDispatch();
  const { isOpenModal } = useSelector<RootState, DonationFormStateType>(state => state.donation);

  const open = () => dispatch(openModal());
  const close = () => dispatch(closeModal());

  return { isOpen: isOpenModal, open, close };
}