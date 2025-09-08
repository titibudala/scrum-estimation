import cookie from "cookie";
import { ExtendedError, Socket } from "socket.io";

import { getJWTPayload } from "@workspace/shared/token";
import { redis } from "../redis/client.js";

export async function validateUser(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  const parsedCookies = cookie.parse(socket.handshake.headers.cookie || "");
  const roomId = socket.handshake.query.roomId as string;

  const { userId } = await getJWTPayload(
    parsedCookies["scrum-estimation-session"],
    process.env.SESSION_TOKEN
  );

  if (userId) {
    socket.data.userId = userId;

    const isRoomAvailable = await redis.exists(`room:${roomId}:config`);

    if (isRoomAvailable) {
      next();
    } else {
      next(new Error("No room available m8"));
    }
  } else {
    next(new Error("No se puede!"));
  }
}
