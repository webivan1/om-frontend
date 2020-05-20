import { RegionType } from "../../store/regions/types";
import { PointType } from "../../services/coords/types";
import { EventType } from "../../store/events/types";

export type FullLoadPointsType = {
  [index in string]: true;
}

export type PropTypes = {
  event: EventType;
  onSetTotal?: (total: number) => void;
}

export type PointUserType = {
  id: string;
  lat: number;
  lng: number;
}

export type AttachEventsType<M> = (
  event: EventType,
  socket: SocketIOClient.Socket,
  addMarkers: (markers: M) => void,
  removeMarker: (point: PointUserType) => void,
  setTotal?: (total: number) => void
) => void;