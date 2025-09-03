import "server-only";

import { createClient } from "redis";

const redis = createClient({
  url: "redis://redis:6379",
});

redis.on("error", (err) => console.error("Redis Client Error", err));

redis.connect();

export { redis };

// import { createClient } from "redis";

// export const redis = await createClient({
//   disableOfflineQueue: true,
//   socket: {
//     port: 6379,
//     host: "localhost",
//   },
// })
//   .on("error", (err) => console.log("Redis Client Error", err))
//   .connect();

// const globalForRedis = global as unknown as {
//   redis?: ReturnType<typeof createClient>;
// };

// export const redis = globalForRedis.redis ?? createClient();

// if (!globalForRedis.redis) {
//   redis.connect().catch(console.error);
//   globalForRedis.redis = redis;
// }
