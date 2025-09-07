import cookie from "cookie";
import { ExtendedError, Socket } from "socket.io";

import { getJWTPayload } from "@workspace/shared/token";
import { redis } from "../redis/client.js";
import logger from "../logger/client.js";

export async function validateUser(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const parsedCookies = cookie.parse(socket.handshake.headers.cookie || "");

  logger.info("WS - VALIDATE USER 1 :", parsedCookies);

  const roomId = socket.handshake.query.roomId as string;

  const { userId } = await getJWTPayload(
    parsedCookies["session"],
    process.env.SESSION_TOKEN
  );

  logger.info("WS - VALIDATE USER 2 :", userId);

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
