import { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/password.controller.js";
import { getAuditLogs } from "../controllers/audit.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import authorize from "../middlewares/auth.middleware.js";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const passwordRouter = Router();

passwordRouter.post("/forgot-password", authLimiter, validate(forgotPasswordSchema), forgotPassword);
passwordRouter.post("/reset-password", validate(resetPasswordSchema), resetPassword);
passwordRouter.get("/audit", authorize, getAuditLogs);

export default passwordRouter;
