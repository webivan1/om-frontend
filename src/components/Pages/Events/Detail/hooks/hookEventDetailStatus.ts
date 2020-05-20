import React from "react";
import { useEventItem } from "../../../Profile/Events/hooks/hookEventItem";

// Types
import { StatusType } from "../types";
import { EventType } from "../../../../../store/events/types";

export type HookEventDetailStatusType = {
  status: StatusType;
  isStarted: boolean;
  isFinished: boolean;
  timeToMeeting: string;
  timeToFinish: string;
};

export const useEventDetailStatus = (item: EventType): HookEventDetailStatusType => {

  const { isStarted, isFinished, timeToMeeting, timeToFinish } = useEventItem(item);

  let status: StatusType = 'waiting';

  if (isStarted && !isFinished) {
    status = 'starting';
  } else if (isFinished) {
    status = 'finished';
  }

  return {
    status,
    isStarted,
    isFinished,
    timeToMeeting,
    timeToFinish
  };
};