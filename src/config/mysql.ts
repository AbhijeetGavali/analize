import * as dotenv from "dotenv";
import { createPool } from "mysql2/promise";
dotenv.config();

export const pool = createPool({
  host: process.env.DATABASE_HOST ?? "",
  user: process.env.DATABASE_USER_NAME ?? "",
  password: process.env.DATABASE_PASSWORD ?? "",
  database: process.env.DATABASE_NAME ?? "",
});
