import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "server/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: { url: "server/db/sqlite.db" },
} satisfies Config;
