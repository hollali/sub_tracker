import { config } from "dotenv";
import path from "path";
import { cleanEnv, str, port } from "envalid";

config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}.local`) });

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  NODE_ENV: str({ choices: ["development", "production", "test"], default: "development" }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "7d" }),
  SMTP_HOST: str({ default: "" }),
  SMTP_PORT: port({ default: 587 }),
  SMTP_USER: str({ default: "" }),
  SMTP_PASS: str({ default: "" }),
  CORS_ORIGIN: str({ default: "*" }),
});

export const PORT = env.PORT;
export const NODE_ENV = env.NODE_ENV;
export const DATABASE_URL = env.DATABASE_URL;
export const JWT_SECRET = env.JWT_SECRET;
export const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;
export const SMTP_HOST = env.SMTP_HOST;
export const SMTP_PORT = env.SMTP_PORT;
export const SMTP_USER = env.SMTP_USER;
export const SMTP_PASS = env.SMTP_PASS;
export const CORS_ORIGIN = env.CORS_ORIGIN;
