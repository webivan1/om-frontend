import { LatLngType } from "../../../websocket/src/app/types";
import { ComputeBoundsType } from "../services/coords/types";

export function isPointInPolygon(point: LatLngType, circle: ComputeBoundsType): boolean {
  return (circle.from.lat <= point.lat && circle.from.lng <= point.lng) &&
    (circle.to.lat >= point.lat && circle.to.lng >= point.lng);
}