import { createClient } from "redis";
import { getLogger } from "./logger";

const {
  REDIS_HOST: host,
  REDIS_PORT: port,
  NODE_ENV = "DEV",
} = process.env;
const logger = getLogger("redis");

const redisConfig =
  NODE_ENV === "DEV"
    ? {
        socket: {
          host: host ?? "localhost",
          port: Number(port) ?? 6379,
        },
      }
    : {
        socket: {
          host,
        },
      };

export const getRedisClient = async () => {
  const redisClient = createClient(redisConfig);

  await redisClient.connect();
  logger.info(`Connected to Redis at ${host}:${port}`);

  const storeInRedis = async (key: string, value: string) => {
    logger.info(`Storing ${key} in Redis`);
    await redisClient.set(key, value);
  };

  const getFromRedis = async (key: string) => {
    logger.info(`Getting ${key} from Redis`);
    return await redisClient.get(key);
  };

  return {
    storeInRedis,
    getFromRedis,
  };
};
