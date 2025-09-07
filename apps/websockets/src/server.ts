import { httpServer } from "./services/express/client.js";
import { redis } from "./services/redis/client.js";
import { roomJoinSocket, roomSocket } from "./services/socketio/client.js";
import { validateUser } from "./services/socketio/utils.js";
import logger from "./services/logger/client.js";

logger.info("INIT THE SERVER");

roomSocket.use(validateUser);
roomJoinSocket.use(validateUser);

// TODO: Clean-up these websockets callbacks

roomJoinSocket.on("connection", async (socket) => {
  console.log("SOCKET - WAITING TO JOIN");

  const userId = socket.data.userId;
  const roomId = socket.handshake.query.roomId as string;

  socket.join(userId);

  socket.on("disconnect", async () => {
    socket.leave(userId);

    const response = await redis.hGet(
      `room:${roomId}:players`,
      `${userId}:verified`
    );

    if (!Number(response)) {
      await redis.hDel(`room:${roomId}:players`, [
        `${userId}:id`,
        `${userId}:active`,
        `${userId}:name`,
        `${userId}:verified`,
      ]);
    }
  });
});

roomSocket.on("connection", async (socket) => {
  console.log("WS - ROOM :", socket.data.userId);

  const userId = socket.data.userId;
  const roomId = socket.handshake.query.roomId as string;

  socket.join(roomId);

  socket.on("disconnect", async () => {
    await Promise.all([
      redis.hSet(`room:${roomId}:players`, {
        [`${userId}:active`]: 0,
      }),
      redis.hExpire(
        `room:${roomId}:players`,
        [
          `${userId}:id`,
          `${userId}:active`,
          `${userId}:name`,
          `${userId}:verified`,
        ],
        60
      ),
    ]);
  });

  socket.on("room:player:verify", async (playerId) => {
    await Promise.all([
      redis.hSet(`room:${roomId}:players`, `${playerId}:verified`, 1),
      redis.hExpire(
        `room:${roomId}:players`,
        [
          `${playerId}:id`,
          `${playerId}:active`,
          `${playerId}:name`,
          `${playerId}:verified`,
        ],
        60
      ),
    ]);

    roomJoinSocket.to(playerId).emit("room:player:join", 1);
  });

  await Promise.all([
    redis.hSet(`room:${roomId}:players`, {
      [`${userId}:active`]: 1,
    }),
    redis.hPersist(`room:${roomId}:players`, [
      `${userId}:id`,
      `${userId}:active`,
      `${userId}:name`,
      `${userId}:verified`,
    ]),
  ]);

  const roomConfig = await redis.json.get(`room:${roomId}:config`);

  socket.emit("room:config", roomConfig);
});

logger.info(
  "This is the port that the server listens on :",
  process.env.SERVER_PORT
);

httpServer.listen(process.env.SERVER_PORT);
