import EchoServer from "laravel-echo";
import { Channel } from "laravel-echo/src/channel/channel";
import io from "socket.io-client";
import { http } from "../http";
import { AxiosStatic } from "axios";

interface CustomWindow extends Window {
  io?: SocketIOClientStatic;
  axios?: AxiosStatic;
}

declare let window: CustomWindow;

window.io = io;
window.axios = http;

class MyEchoServer extends EchoServer {
  channel(channel: string): Channel {
    return super.channel(`our_rights_${channel}`);
  }

  leave(channel: string) {
    super.leave(`our_rights_${channel}`);
  }
}

export const Echo = new MyEchoServer({
  broadcaster: 'socket.io',
  host: process.env.REACT_APP_LARAVEL_ECHO_URL,
  transports: ['websocket', 'polling', 'flashsocket'],
  namespace: '',
});