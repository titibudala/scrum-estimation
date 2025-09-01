import { createClient } from "redis";

const globalForRedis = global as unknown as {
  redis?: ReturnType<typeof createClient>;
};

export const redis = globalForRedis.redis ?? createClient();

if (!globalForRedis.redis) {
  redis.connect().catch(console.error);
  globalForRedis.redis = redis;
}
