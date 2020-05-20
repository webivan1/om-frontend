import io from 'socket.io-client';

export default function socket(queryParams?: Object) {
  return io(process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:9001', {
    rememberUpgrade: true,
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false,
    query: queryParams
  });
}