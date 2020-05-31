import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import * as userActions from "./actions";
import { UserStateType, UserType } from "./types";
import { UserUuidService } from "../../services/user.uuid.service";

const initialState: UserStateType = {
  user: null,
  token: null,
  expired: null,
  userUuid: UserUuidService.get()
}

export default createReducer(initialState, {
  [userActions.setUser.type]: (state: UserStateType, action: PayloadAction<UserType>) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
    state.expired = action.payload.expired;
  },
  [userActions.clearUser.type]: (state: UserStateType) => {
    state.user = null;
    state.token = null;
    state.expired = null;
  }
});