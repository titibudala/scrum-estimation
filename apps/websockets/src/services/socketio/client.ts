import { Server } from "socket.io";
import { httpServer } from "../express/client.js";
import { validateUser } from "./utils.js";

console.log("--------cacacacacac", process.env.WEBSCOKET_CORS_ORIGIN);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEBSCOKET_CORS_ORIGIN,
    credentials: true,
  },
});

const roomSocket = io.of("/room");
const roomJoinSocket = io.of("/join");

export { io, roomSocket, roomJoinSocket };
