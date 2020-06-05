import { ComputeBoundsType, PointType } from "../services/coords/types";

export function isPointInPolygon(point: PointType, circle: ComputeBoundsType): boolean {
  return (circle.from.lat <= point.lat && circle.from.lng <= point.lng) &&
    (circle.to.lat >= point.lat && circle.to.lng >= point.lng);
}