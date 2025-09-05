import { Server } from "socket.io";
import { httpServer } from "../express/client.js";

const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEBSCOKET_CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

const roomSocket = io.of("/room");
const roomJoinSocket = io.of("/join");

export { io, roomSocket, roomJoinSocket };
