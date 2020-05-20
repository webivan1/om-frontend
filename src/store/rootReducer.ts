import { combineReducers } from "@reduxjs/toolkit";

import { region, regions } from "./regions";
import user from "./user/reducer";
import login from "./login/reducer";
import { eventStat } from "./eventStatistic";
import {
  profileEventList,
  publicEventList,
  publicEventDetail
} from "./events";

export default combineReducers({
  region,
  regions,
  user,
  login,
  profileEventList,
  publicEventList,
  publicEventDetail,
  eventStat
});