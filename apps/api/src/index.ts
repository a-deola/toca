import express from "express";
import { pool } from "./db.ts";
import pino from "pino";
import {pinoHttp} from "pino-http";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
});

app.use(pinoHttp({ logger }));
app.use(express.json());

async function start() {
  try {
    const client = await pool.connect();
    client.release();
    logger.info("Database connected");

    app.listen(port, "0.0.0.0", () => {
      logger.info(`API listening on port ${port}`);
    });
  } catch (error) {
    logger.error({ err: error }, "Database connection failed");
    process.exit(1);
  }
}

void start();
