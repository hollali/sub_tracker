import path from "path";
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: path.resolve(process.cwd(), ".env") });
config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}.local`) });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
