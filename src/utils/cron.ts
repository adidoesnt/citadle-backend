import cron from "node-cron";
import { getLogger } from "./logger";

const { CRON_EXPRESSION: exp = "* * * * *" } = process.env;
const logger = getLogger("cron");

export const schedule = (task: () => void) => {
  logger.info(`Scheduling task with expression: ${exp}`);
  cron.schedule(exp, task, {
    scheduled: true,
    timezone: "Asia/Singapore",
  });
};
