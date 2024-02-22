import { Elysia } from "elysia";
import { health, city, docs } from "plugins";
import { getLogger } from "utils";
import { setupCron } from "components";
import { cors } from "plugins";

const { PORT: port = 3001 } = process.env;

const app = new Elysia().use(cors).use(health).use(docs).use(city).listen(port);
const logger = getLogger("index");

await setupCron();

const { server } = app;
if (server) {
  const { hostname, port } = server;
  logger.info(`🦊 Elysia server is running at ${hostname}:${port}`);
} else {
  logger.error("🦊 Elysia server failed to start");
}
