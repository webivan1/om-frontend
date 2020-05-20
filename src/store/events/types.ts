import { RegionType } from "../regions/types";
import { UserModelType } from "../user/types";

export enum EventStatuses {
  'draft' = 'draft',
  'moderation' = 'moderation',
  'reject' = 'reject',
  'approved' = 'approved'
}

export enum EventStatusLabels {
  'draft' = 'Черновик',
  'moderation' = 'На модерации',
  'reject' = 'Отклонен',
  'approved' = 'Активен'
}

export enum EventStatusClasses {
  'draft' = 'secondary',
  'moderation' = 'warning',
  'reject' = 'danger',
  'approved' = 'success'
}

export type EventType = {
  id: number;
  interval: number; // hours
  title: string;
  description: string;
  region: RegionType;
  user: UserModelType;
  createdAt?: number;
  updatedAt?: number;
  startAt: number;
  finishAt: number;
  status: keyof typeof EventStatuses;
  timezoneUTC: string;
  isStarted: boolean;
  isFinished: boolean;
};

