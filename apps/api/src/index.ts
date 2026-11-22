import express from "express";
import { pool } from "./db.ts";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(express.json());

async function start() {
  try {
    const client = await pool.connect();
    client.release();
    console.log("Database connected");

    app.listen(port, "0.0.0.0", () => {
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

void start();
