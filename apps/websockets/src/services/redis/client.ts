import { createClient } from "redis";
import { unflatten } from "./utils.js";
import { roomSocket } from "../socketio/client.js";

export const redis = await createClient({
  url: process.env.REDIS_URL,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

redis.configSet("notify-keyspace-events", "Khd");

export const redisSubscriber = await redis.duplicate().connect();

const keyspace = "__keyspace@0__";

redisSubscriber.pSubscribe(
  `${keyspace}:room:*:players`,
  async (_message, channel) => {
    const key = channel.replace(`${keyspace}:`, "");
    const roomId = key.split(":")[1] || "";

    const response = await redis.hGetAll(key);
    const sanitizedResponse = unflatten(response);

    roomSocket.to(roomId).emit("room:player", sanitizedResponse);
  }
);

redisSubscriber.pSubscribe(
  `${keyspace}:room:*:ticket`,
  async (_message, channel) => {
    const key = channel.replace(`${keyspace}:`, "");
    const roomId = key.split(":")[1] || "";

    const response = await redis.json.get(`room:${roomId}:ticket`);

    roomSocket.to(roomId).emit("room:ticket", response);
  }
);

redisSubscriber.pSubscribe(
  `${keyspace}:room:*:config`,
  async (_message, channel) => {
    const key = channel.replace(`${keyspace}:`, "");
    const roomId = key.split(":")[1] || "";

    const response = await redis.json.get(`room:${roomId}:config`);

    roomSocket.to(roomId).emit("room:config", response);
  }
);
