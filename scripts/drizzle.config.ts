import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/lib/server/db/migrations",
  schema: "./src/lib/server/db/schema.ts",
  dialect: "sqlite",
});
