import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LatLngType } from "../../../../../websocket/src/app/types";
import { EventType } from "../../../store/events/types";
import { createSocket } from "../../Map/websocket";
import { RootState } from "../../../store/store";
import { UserStateType } from "../../../store/user/types";
import { ComputeBoundsType } from "../../../services/coords/types";
import { computeBounds } from "../../../services/coords/coords";
import { isPointInPolygon } from "../../../helpers";

const getPosition = () => new Promise<Position>((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject);
});

export const useDetectUser = (event: EventType) => {

  const { userUuid } = useSelector<RootState, UserStateType>(state => state.user);

  const [error, setError] = useState<string|null>(null);
  const [position, setPosition] = useState<LatLngType|null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket|null>(null);
  const [online, setOnline] = useState<boolean>(false);

  const getPositionHandler = async () => {
    try {
      const { coords: { latitude, longitude } } = await getPosition();
      const point: LatLngType = { lat: latitude, lng: longitude };
      const border: ComputeBoundsType = computeBounds(event.region, event.region.distance);

      if (isPointInPolygon(point, border)) {
        setPosition(point);
        setError(null);
      } else {
        setError(`Вы находитесь за пределами города, поэтому не можете принять участие в митинге`);
      }
    } catch (e) {
      setError('Вы должны разрешить доступ к геолокации, для проверки местоположения')
    }
  }

  const onlineHandler = () => {
    if (socket && position) {
      socket.emit('add connection', {...position, userId: userUuid});
      setOnline(true);
    }
  }

  const offlineHandler = () => {
    if (socket) {
      socket.emit('remove connection');
      setOnline(false);
    }
  }

  useEffect(() => {
    getPositionHandler().then();
  }, [userUuid]);

  useEffect(() => {
    position && setSocket(createSocket(event));
  }, [position]);

  useEffect(() => {
    return function cleanup() {
      socket && socket.emit('remove connection');
    }
  }, [socket]);

  return {
    error,
    position,
    socket,
    isOnline: online,
    getPositionHandler,
    onlineHandler,
    offlineHandler
  };
}