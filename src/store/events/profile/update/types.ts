import { EventType } from "../../types";

export enum EventFormStatuses {
  success = 'success',
  error = 'error'
}

export type ProfileEventUpdateFormState = {
  form: {
    loader: boolean;
    error: null|string;
    success: null|string;
  },
  detail: {
    loader: boolean;
    error: null|string;
    event: EventType|null;
  }
}

export type ProfileEventUpdateResponseSuccess = {
  status: EventFormStatuses.success;
  event: EventType;
}

export type ProfileEventUpdateResponseError = {
  status: EventFormStatuses.error;
  message: string;
}

export type ProfileEventUpdateResponse = ProfileEventUpdateResponseSuccess | ProfileEventUpdateResponseError;