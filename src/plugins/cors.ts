import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

const { FRONTEND_URL = "", NODE_ENV = "DEV" } = process.env;
const corsConfig =
  NODE_ENV === "DEV"
    ? undefined
    : {
        origin(request: Request) {
          if (corsConfig) {
            const { origin } = request.headers as Headers & { origin: any };
            if (origin && FRONTEND_URL.includes(origin)) {
              return origin;
            }
          }
          return false;
        },
      };

export const corsPlugin = (app: Elysia) => app.use(cors(corsConfig));
