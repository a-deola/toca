import express from "express";
import { Pool } from "pg";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const db = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.json());

async function start() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }

    await db.query("SELECT 1");
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