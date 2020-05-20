import { RegionType } from "../types";

export type RegionsStateType = {
  fetchLoader: boolean;
  regions: RegionType[];
}