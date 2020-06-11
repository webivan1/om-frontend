import { combineReducers } from "@reduxjs/toolkit";

import { region, regions } from "./regions";
import user from "./user/reducer";
import login from "./login/reducer";
import { eventStat } from "./eventStatistic";
import notification from "./notification/reducer";
import chat from "./chat/reducer";
import chatForm from "./chatForm/reducer";
import donation from "./donation/reducer";
import {
  profileEventList,
  publicEventList,
  publicEventDetail,
  profileEventCreate,
  profileEventUpdate
} from "./events";

export default combineReducers({
  region,
  regions,
  user,
  login,
  notification,
  profileEventList,
  publicEventList,
  publicEventDetail,
  profileEventCreate,
  profileEventUpdate,
  eventStat,
  chat,
  chatForm,
  donation
});