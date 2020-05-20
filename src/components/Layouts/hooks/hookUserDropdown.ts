import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Types
import { RootState } from "../../../store/store";
import { LoginStateType } from "../../../store/login/types";
import { UserModelType, UserStateType } from "../../../store/user/types";

// Actions
import { logoutAsync, showModal } from "../../../store/login/actions";

export type HookUserDropdownType = {
  user: UserModelType|null;
  loaderLoginForm: boolean;
  handlerLogout: () => void;
  handleShowModal: () => void;
}

export const useUserDropdown = (): HookUserDropdownType => {
  const dispatch = useDispatch();

  const { loader: loaderLoginForm } = useSelector<RootState, LoginStateType>(state => state.login);
  const { user } = useSelector<RootState, UserStateType>(state => state.user);

  const handlerLogout = () => {
    dispatch(logoutAsync());
  };

  const handleShowModal = () => dispatch(showModal());

  return {
    user,
    loaderLoginForm,
    handlerLogout,
    handleShowModal,
  };
}