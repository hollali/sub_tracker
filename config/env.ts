import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "development"}.local`) });

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const DATABASE_URL = process.env.DATABASE_URL!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
