import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getUserSubscriptions,
  cancelSubscription,
  getUpcomingRenewals,
} from "../controllers/subscription.controller.js";
import { createSubscriptionSchema, updateSubscriptionSchema } from "../validations/index.js";

const subscriptionRouter = Router();

subscriptionRouter.use(authorize);

subscriptionRouter.get("/", getSubscriptions);
subscriptionRouter.get("/upcoming-renewals", getUpcomingRenewals);
subscriptionRouter.get("/user/:id", getUserSubscriptions);
subscriptionRouter.get("/:id", getSubscription);
subscriptionRouter.post("/", validate(createSubscriptionSchema), createSubscription);
subscriptionRouter.put("/:id", validate(updateSubscriptionSchema), updateSubscription);
subscriptionRouter.delete("/:id", deleteSubscription);
subscriptionRouter.put("/:id/cancel", cancelSubscription);

export default subscriptionRouter;
