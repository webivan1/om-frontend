import { createAction } from "@reduxjs/toolkit";
import captchaToken from "../../services/captcha";
import { setUser, clearUser } from "../user/actions";
import StorageToken from "../user/StorageToken";

// Types
import { UserResponseStatuses, UserType } from "../user/types";
import { LoginFormType } from "./types";
import { AppThunk } from "../store";

// Api
import api from "../../api";

export const setLoader = createAction<boolean>('login/set-loader');
export const setError = createAction<string|null>('login/set-error');
export const setSuccess = createAction<string|null>('login/set-success');
export const showModal = createAction('login/show-modal');
export const hideModal = createAction('login/hide-modal');

export const loginAsync = (credentials: LoginFormType): AppThunk => async (dispatch) => {
  dispatch(setLoader(true));

  try {
    const captcha: string = await captchaToken('login');
    const response = await api.auth.login({...credentials, captcha});

    if (response.status === UserResponseStatuses.success) {
      const user: UserType = {
        user: response.user,
        token: response.token,
        expired: response.expired
      };

      const storage = new StorageToken();
      storage.setToken(user.token, user.user.id, user.expired);

      dispatch(setUser(user));
      dispatch(setSuccess('logged in'));
    } else {
      dispatch(setError(response.message));
    }
  } catch (e) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoader(false));
  }
};

export const logoutAsync = (): AppThunk => dispatch => {
  const storage = new StorageToken();
  storage.clear();

  dispatch(clearUser());
};

export const autoLoginAsync = (): AppThunk => async (dispatch) => {
  const storage = new StorageToken();
  const token = storage.getToken();
  const userId = storage.getUserId();
  const expired = storage.getExpiredAt();

  if (!token || !userId || !expired) {
    return;
  }

  dispatch(setLoader(true));

  try {
    const user = await api.auth.checkToken({ token, userId });
    dispatch(setUser({ user, token, expired }));
  } catch (e) {
    storage.clear();
  } finally {
    dispatch(setLoader(false));
  }
};