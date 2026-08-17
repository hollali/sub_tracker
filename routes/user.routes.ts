import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { signUpSchema, updateUserSchema } from "../validations/index.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", validate(signUpSchema), createUser);
userRouter.put("/:id", validate(updateUserSchema), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
