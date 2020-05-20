import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Types
import { RootState } from "../../../store/store";
import { RegionStateType } from "../../../store/regions/item/types";
import { RegionsStateType } from "../../../store/regions/list/types";
import { RegionType } from "../../../store/regions/types";

// Actions
import { setRegionAsync } from "../../../store/regions/item/actions";
import { getListRegionsAsync } from "../../../store/regions/list/actions";

export type HookRegionDropdownType = {
  region: RegionType;
  regions: RegionsStateType;
  handleChangeRegion: (regionItem: RegionType) => void;
};

export const useRegionDropdown = () => {
  const dispatch = useDispatch();

  const { region } = useSelector<RootState, RegionStateType>(state => state.region);
  const regions = useSelector<RootState, RegionsStateType>(state => state.regions);

  useEffect(() => {
    // get all regions
    dispatch(getListRegionsAsync());
  }, [dispatch]);

  const handleChangeRegion = (regionItem: RegionType) => {
    dispatch(setRegionAsync(regionItem));
  };

  return {
    region,
    regions,
    handleChangeRegion
  };
};