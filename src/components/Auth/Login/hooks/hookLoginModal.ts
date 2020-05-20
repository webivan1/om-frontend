import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store/store";
import { LoginStateType } from "../../../../store/login/types";
import { hideModal } from "../../../../store/login/actions";

export const useLoginModal = () => {

  const dispatch = useDispatch();
  const { isShowModal } = useSelector<RootState, LoginStateType>(state => state.login);

  const handleCloseModal = () => dispatch(hideModal());

  return {
    isShowModal,
    handleCloseModal
  }
};