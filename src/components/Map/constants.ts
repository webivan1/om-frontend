export enum SocketListenEvents {
  SET_CONNECTIONS = 'map group connections',
  ADD_CONNECTION = 'map new connection',
  REMOVE_CONNECTION = 'map remove connection',
  TOTAL_CONNECTIONS = 'total connection'
}

export enum SocketEmitEvents {
  GET_ALL_CONNECTIONS = 'map get all connections',
  GET_TOTAL = 'get total'
}