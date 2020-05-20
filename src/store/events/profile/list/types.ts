import { EventStatuses, EventType } from "../../types";
import { ListParamsType } from "../../../common/types";

export type EventListType = ListParamsType<EventType>;

export type EventFilterParamsType = {
  status?: keyof typeof EventStatuses | '';
  regionSlug?: string;
  isEventOnline?: boolean|1|0;
  isEventFinished?: boolean|1|0;
  title?: string;
  startDate?: string;
}

export type EventListStateType = EventListType & {
  loader: boolean;
  error: string|null;
  form: EventFilterParamsType;
}