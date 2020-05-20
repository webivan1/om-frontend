import { createAction } from "@reduxjs/toolkit";
import { RegionType } from "../types";
import { AppThunk } from "../../store";

export const setItem = createAction<RegionType>('region/set-item');

export const setRegionAsync = (region: RegionType): AppThunk => dispatch => {
  dispatch(setItem(region));
  localStorage.setItem('regionSelected', region.slug);
};