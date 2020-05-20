import { ListParamsType } from "../../../common/types";
import { EventType } from "../../types";

export type EventPublicListType = ListParamsType<EventType>;

export type EventPublicListStateType = EventPublicListType & {
  loader: boolean;
  error: string|null;
}

export type EventPublicListFilterType = {
  region: number|null|undefined;
}