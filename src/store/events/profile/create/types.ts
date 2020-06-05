import { EventType } from "../../types";

export enum EventFormStatuses {
  success = 'success',
  error = 'error'
}

export type ProfileEventCreateFormState = {
  loader: boolean;
  error: null|string;
  event: EventType|null;
}

export type ProfileEventCreateResponseSuccess = {
  status: EventFormStatuses.success;
  event: EventType;
}

export type ProfileEventCreateResponseError = {
  status: EventFormStatuses.error;
  message: string;
}

export type ProfileEventCreateResponse = ProfileEventCreateResponseSuccess | ProfileEventCreateResponseError;