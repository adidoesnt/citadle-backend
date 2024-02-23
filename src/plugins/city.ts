import { getCurrentCityFromRedis, storeCityInRedis } from "components";
import { Elysia } from "elysia";

const { API_KEY: apiKey } = process.env;

export const city = new Elysia({
  prefix: "city",
})
  .onBeforeHandle(({ headers, set }) => {
    if (headers["x-api-key"] !== apiKey) {
      set.status = 401;
      return "Unauthorized";
    }
  })
  .get("/", async ({ set }) => {
    try {
      const city = await getCurrentCityFromRedis();
      set.status = 200;
      return { city };
    } catch (error) {
      set.status = 500;
      return error;
    }
  })
  .post("/", async ({ body, set }) => {
    try {
      const { city } = body as { city: string };
      await storeCityInRedis(city);
      set.status = 200;
      return "OK";
    } catch (error) {
      set.status = 500;
      return error;
    }
  });
