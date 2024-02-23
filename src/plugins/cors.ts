import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

const { FRONTEND_URL, NODE_ENV = "DEV" } = process.env;
const corsConfig = NODE_ENV === "DEV" ? undefined : { origin: FRONTEND_URL };

export const corsPlugin = (app: Elysia) => app.use(cors(corsConfig));
