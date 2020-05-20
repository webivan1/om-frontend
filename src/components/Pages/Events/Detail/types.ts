import { FC } from "react";
import { EventType } from "../../../../store/events/types";

export type EventPropTypes = {
  event: EventType;
  timeToMeeting: string;
  timeToFinish: string;
};

export enum StatusEvent {
  'waiting',
  'starting',
  'finished'
}

export type StatusType = keyof typeof StatusEvent;

export type ConfigType = {
  [key in StatusType]: FC<EventPropTypes>
};

export type RouteParamsType = {
  id: string;
}