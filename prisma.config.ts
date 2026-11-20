import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Session pooler / direct connection (port 5432), used by Prisma migrations
    url: env("DIRECT_URL"),
  },
});
