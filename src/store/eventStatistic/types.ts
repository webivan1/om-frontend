export type EventStatisticType = {
  id: number;
  total: number;
  createdAt: number;
}

export type EventStatisticStateType = {
  rows: EventStatisticType[];
  totalMax: number;
  loader: boolean;
  error: string|null;
}