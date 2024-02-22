import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export const docs = (app: Elysia) =>
  app.use(
    swagger({
      autoDarkMode: true,
      path: "/docs",
    })
  );
