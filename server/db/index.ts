import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import "./schema";

const sqlite = new Database("server/db/sqlite.db");
export const db = drizzle(sqlite);

export * from "./queries";
export * from "./schema";
