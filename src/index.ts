import { Elysia } from "elysia";
import { health } from "plugins";
import { getLogger } from "utils";

const { PORT: port = 3001 } = process.env;

const app = new Elysia().use(health).listen(port);
const logger = getLogger('index');

const { server } = app;
if(server) {
  const { hostname, port } = server;
  logger.info(`🦊 Elysia server is running at ${hostname}:${port}`);
} else {
  logger.error('🦊 Elysia server failed to start');
}
