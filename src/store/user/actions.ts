import { createAction } from "@reduxjs/toolkit";
import { UserType } from "./types";

export const setUser = createAction<UserType>('user/set-user');
export const clearUser = createAction('user/logout-user');