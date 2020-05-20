import { ComputeBoundsType, PointType } from "./types";

export const EARTH_RADIUS = 6378245;

export function deg2rad(degree: number): number {
  return degree * (Math.PI / 180);
}

export function rad2deg(degree: number): number {
  return degree * (180 / Math.PI);
}

/**
 * @param {PointType} point
 * @param {number} distance - meters
 * @return {ComputeBoundsType}
 */
export function computeBounds({ lat, lng }: PointType, distance: number): ComputeBoundsType {
  const latRadiansDistance = distance / EARTH_RADIUS;
  const latDegreesDistance = rad2deg(latRadiansDistance);
  const lngDegreesDistance = rad2deg(latRadiansDistance / Math.cos(deg2rad(lat)));

  const swLat = lat - latDegreesDistance;
  const swLng = lng - lngDegreesDistance;

  const neLat = lat + latDegreesDistance;
  const neLng = lng + lngDegreesDistance;

  return {
    from: { lat: swLat, lng: swLng },
    to: { lat: neLat, lng: neLng }
  };
}

export function isPointBetweenPoints(point: PointType, points: ComputeBoundsType): boolean {
  return (points.from.lat <= point.lat && points.from.lng <= point.lng) &&
    (points.to.lat >= point.lat && points.to.lng >= point.lng);
}