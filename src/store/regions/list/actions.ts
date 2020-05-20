import { createAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import { RegionType } from "../types";
import api from "../../../api";

import { setRegionAsync } from "../item/actions";
import { isString } from "../../../guards";

export const setLoader = createAction<boolean>('region/list-loader');
export const setList = createAction<RegionType[]>('region/list-set');

export const getListRegionsAsync = (): AppThunk => async dispatch => {
  dispatch(setLoader(true));

  try {
    const list = await api.region.list();
    dispatch(setList(list));

    const regionSelected: string|null = localStorage.getItem('regionSelected');

    if (list.length > 0) {
      dispatch(setRegionAsync(
        list.find(item => item.slug === regionSelected) || list[0]
      ));
    }
  } catch (e) {
    dispatch(setList([]))
  } finally {
    dispatch(setLoader(false));
  }
};