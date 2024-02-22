import { getCurrentCityFromRedis } from "components";
import { Elysia } from "elysia";

const { API_KEY: apiKey } = process.env;

export const city = new Elysia({
  prefix: "city",
}).get(
  "/",
  async ({ set }) => {
    try {
      const city = await getCurrentCityFromRedis();
      set.status = 200;
      return { city };
    } catch (error) {
      set.status = 500;
      return error;
    }
  },
  {
    beforeHandle: ({ headers, set }) => {
      if (headers["x-api-key"] !== apiKey) {
        set.status = 401;
        return "Unauthorized";
      }
    },
  }
);
