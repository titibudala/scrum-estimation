import cookie from "cookie";
import { ExtendedError, Socket } from "socket.io";

import { getJWTPayload } from "@workspace/shared/token";
import { redis } from "../redis/client.js";
import logger from "../logger/client.js";

import dotenv from "dotenv";
dotenv.config();

export async function validateUser(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  logger.info("WS - VALIDATE USER 0 :", "\n", socket.handshake.headers.cookie);
  const parsedCookies = cookie.parse(socket.handshake.headers.cookie || "");

  logger.info("WS - VALIDATE USER 1 :", "\n", parsedCookies);
  
  const roomId = socket.handshake.query.roomId as string;

  logger.info("WS - VALIDATE USER 1 :", "\n", parsedCookies["session"], process.env.SESSION_TOKEN);

  const response = await getJWTPayload(
    parsedCookies["session"],
    process.env.SESSION_TOKEN
  );

  logger.info("WS - VALIDATE USER 3 :", response);

  const userId = response.userId;

  if (userId) {
    socket.data.userId = userId;

    const isRoomAvailable = await redis.exists(`room:${roomId}:config`);

    if (isRoomAvailable) {
      next();
    } else {
      next(new Error("No room m8"));
    }
  } else {
    next(new Error("No se puede!"));
  }
}
