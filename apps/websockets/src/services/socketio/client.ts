import { Server } from "socket.io";
import { httpServer } from "../express/client.js";

const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEBSCOKET_CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT"],
  },
  // allowEIO3: true,
  // transports: ["polling", "websocket"],
  // transports: ["polling", "websocket"],
});

const roomSocket = io.of("/room");
const roomJoinSocket = io.of("/join");

export { io, roomSocket, roomJoinSocket };
