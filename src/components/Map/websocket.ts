import socketInit from "../../services/socket-io";
import { SocketEmitEvents, SocketListenEvents } from "./constants";
import { ComputeBoundsType } from "../../services/coords/types";
import { PointUserType } from "./types";
import { EventType } from "../../store/events/types";

export const createQueryParams = (event: EventType) => ({
  eventId: event.id,
  duration: event.interval,
  finishedAt: event.finishAt,
  startAt: event.startAt,
  timezone: event.timezoneUTC
});

export const createSocket = (event: EventType): SocketIOClient.Socket => {
  return socketInit(createQueryParams(event));
}

export function connectWebsocket(
  socket: SocketIOClient.Socket,
  borders: ComputeBoundsType,
  setConnection: (connections: PointUserType[]) => void,
  addPlacement: (connection: PointUserType) => void,
  removePlacement: (connection: PointUserType) => void,
  setTotalConnections?: (total: number) => void
) {
  socket.emit(SocketEmitEvents.GET_TOTAL);
  socket.emit(SocketEmitEvents.GET_ALL_CONNECTIONS, borders);

  if (setTotalConnections) {
    socket.on(SocketListenEvents.TOTAL_CONNECTIONS, setTotalConnections);
  }

  socket.on(SocketListenEvents.ADD_CONNECTION, addPlacement);
  socket.on(SocketListenEvents.REMOVE_CONNECTION, removePlacement);
  socket.on(SocketListenEvents.SET_CONNECTIONS, setConnection);

  socket.on('warn', (message: string) => console.log('Error', message));
}

export function leave(socket: SocketIOClient.Socket): void {
  socket.off(SocketListenEvents.ADD_CONNECTION);
  socket.off(SocketListenEvents.REMOVE_CONNECTION);
  socket.off(SocketListenEvents.SET_CONNECTIONS);
  socket.off(SocketListenEvents.TOTAL_CONNECTIONS);
  socket.off('warn');
}