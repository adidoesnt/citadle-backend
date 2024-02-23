import { createClient } from "redis";
import { getLogger } from "./logger";

const {
  REDIS_HOST: host,
  REDIS_PORT: port,
  REDIS_PASSWORD: password,
  REDISCLOUD_URL: url,
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
        url,
      };

const redisClient = createClient(redisConfig);

export const getRedisClient = async () => {
  const storeInRedis = async (key: string, value: string) => {
    await redisClient.connect();
    logger.info(`Storing ${key} in Redis`);
    await redisClient.set(key, value);
    await redisClient.disconnect();
  };

  const getFromRedis = async (key: string) => {
    await redisClient.connect();
    logger.info(`Getting ${key} from Redis`);
    const result = await redisClient.get(key);
    await redisClient.disconnect();
    return result;
  };

  return {
    storeInRedis,
    getFromRedis,
  };
};
