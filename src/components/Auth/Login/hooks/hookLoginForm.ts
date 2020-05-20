import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Types
import { RootState } from "../../../../store/store";
import { FormContextValues } from "react-hook-form/dist/contextTypes";
import { LoginFormType, LoginStateType } from "../../../../store/login/types";

// Actions
import { loginAsync } from "../../../../store/login/actions";

export type HookLoginFormResponse = {
  login: LoginStateType;
  hookForm: FormContextValues<LoginFormType>;
  onSubmit: (data: LoginFormType) => void;
};

export const useLoginForm = (onCompleted?: () => void): HookLoginFormResponse => {
  const dispatch = useDispatch();

  const login = useSelector<RootState, LoginStateType>(state => state.login);
  const hookForm = useForm<LoginFormType>();

  const onSubmit = (data: LoginFormType) => {
    dispatch(loginAsync(data));
  }

  useEffect(() => {
    if (login.success && onCompleted) {
      onCompleted();
    }
  }, [login.success]);

  return {
    login,
    hookForm,
    onSubmit
  };
};