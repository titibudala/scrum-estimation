"use client";

import { ManagerOptions, SocketOptions, io } from "socket.io-client";

const socketOptions: Partial<ManagerOptions & SocketOptions> = {
  autoConnect: false,
  withCredentials: true,
};

export const roomSocket = io(
  `${process.env.NEXT_PUBLIC_WEBSOCKET_API_URL}/room`,
  socketOptions
);

export const roomJoinSocket = io(
  `${process.env.NEXT_PUBLIC_WEBSOCKET_API_URL}/join`,
  socketOptions
);
