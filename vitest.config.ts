import { defineConfig } from "vitest/config";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), ".env.test") });

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts"],
    testTimeout: 30000,
    hookTimeout: 30000,
    coverage: {
      provider: "v8",
      include: ["controllers/**/*.ts", "middlewares/**/*.ts", "services/**/*.ts"],
    },
  },
} as ReturnType<typeof defineConfig>);
