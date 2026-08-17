import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { signUpSchema, signInSchema } from "../validations/index.js";
import { NODE_ENV } from "../config/env.js";

const authRouter = Router();

const limiter = NODE_ENV !== "test" ? authLimiter : (_req: unknown, _res: unknown, next: () => void) => next();

authRouter.post("/sign-up", limiter, validate(signUpSchema), signUp);
authRouter.post("/sign-in", limiter, validate(signInSchema), signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
