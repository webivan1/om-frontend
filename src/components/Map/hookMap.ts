import React, { useState, useEffect } from "react";
import { EventType } from "../../store/events/types";
import { createSocket, leave } from "./websocket";

export const useMap = <M>(event: EventType, subscribeSockets: (objectManager: M) => void): [
  M|undefined,
  (objectManager: M|undefined) => void,
  SocketIOClient.Socket
] => {
  const [socket, setSocket] = useState<SocketIOClient.Socket>(createSocket(event));
  const [objectManager, setObjectManager] = useState<M|undefined>(undefined);

  useEffect(() => {
    if (objectManager) {
      subscribeSockets(objectManager);
    }
  }, [objectManager]);

  useEffect(() => {
    return function cleanup() {
      leave(socket);
      socket.disconnect();
    }
  }, [socket]);

  return [
    objectManager,
    setObjectManager,
    socket
  ];
};