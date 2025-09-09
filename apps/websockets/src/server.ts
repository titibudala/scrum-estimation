import { httpServer } from "./services/express/client.js";
import { redis } from "./services/redis/client.js";
import { roomJoinSocket, roomSocket } from "./services/socketio/client.js";
import { validateUser } from "./services/socketio/utils.js";
import logger from "./services/logger/client.js";

logger.info("Server is initialized");

roomSocket.use(validateUser);
roomJoinSocket.use(validateUser);

// TODO: Clean-up these websockets callbacks

roomJoinSocket.on("connection", async (socket) => {
  const userId = socket.data.userId;
  const roomId = socket.handshake.query.roomId as string;

  socket.join(userId);

  socket.on("disconnect", async () => {
    socket.leave(userId);

    const isPlayerVerified = await redis.hGet(
      `room:${roomId}:players`,
      `${userId}:verified`
    );

    if (!Number(isPlayerVerified)) {
      await redis.hDel(`room:${roomId}:players`, [
        `${userId}:id`,
        `${userId}:name`,
        `${userId}:expertise`,
        `${userId}:active`,
        `${userId}:verified`,
        `${userId}:voted`,
      ]);
    }
  });
});

roomSocket.on("connection", async (socket) => {
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
          `${userId}:name`,
          `${userId}:expertise`,
          `${userId}:active`,
          `${userId}:verified`,
          `${userId}:voted`,
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
          `${playerId}:name`,
          `${playerId}:expertise`,
          `${playerId}:active`,
          `${playerId}:verified`,
          `${playerId}:voted`,
        ],
        60
      ),
    ]);

    roomJoinSocket.to(playerId).emit("room:player:join", 1);
  });

  socket.on("room:player:vote", async (measurementValue) => {
    const hasVoted = measurementValue.length ? 1 : 0;

    await redis.hSet(`room:${roomId}:players`, `${userId}:voted`, hasVoted);

    const { entries } = await redis.hScan(`room:${roomId}:players`, "0", {
      MATCH: `${userId}:*`,
      COUNT: 100,
    });

    const mappedEntries: Record<any, any> = {};

    for (const entry of entries) {
      mappedEntries[entry.field.replace(`${userId}:`, "")] = entry.value;
    }

    const activeTicketId = await redis.json.GET(`room:${roomId}:config`, {
      path: ".activeTicket",
    });

    if (hasVoted && activeTicketId) {
      await redis.json.SET(
        `room:${roomId}:ticket`,
        `$.[?(@.id == "${activeTicketId}")].votes`,
        {
          [userId]: {
            name: mappedEntries.name,
            expertise: mappedEntries.expertise,
            vote: measurementValue,
          },
        }
      );

      return;
    }

    if (!hasVoted && activeTicketId) {
      await redis.json.DEL(`room:${roomId}:ticket`, {
        path: `$.[?(@.id == "${activeTicketId}")].votes.${userId}`,
      });
    }
  });

  await Promise.all([
    redis.hSet(`room:${roomId}:players`, {
      [`${userId}:active`]: 1,
    }),
    redis.hPersist(`room:${roomId}:players`, [
      `${userId}:id`,
      `${userId}:name`,
      `${userId}:expertise`,
      `${userId}:active`,
      `${userId}:verified`,
      `${userId}:voted`,
    ]),
  ]);

  const roomConfig = await redis.json.get(`room:${roomId}:config`);
  const roomTickets = await redis.json.get(`room:${roomId}:ticket`);

  socket.emit("room:config", roomConfig);
  socket.emit("room:ticket", roomTickets);
});

httpServer.listen(process.env.SERVER_PORT);
