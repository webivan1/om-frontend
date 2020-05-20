import { EventType } from "../../types";

export type EventDetailStateType = {
  loader: boolean;
  detail: EventType|null;
  error: string|null;
}

export enum EventDetailStatuses {
  'success' = 'success',
  'error' = 'error'
}

export type EventDetailSuccessResponse = {
  status: EventDetailStatuses.success;
  detail: EventType;
}

export type EventDetailFailResponse = {
  status: EventDetailStatuses.error;
  message: string;
}

export type EventDetailResponseType = EventDetailSuccessResponse | EventDetailFailResponse;