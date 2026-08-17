import { Router } from "express";
import { getOverview, getByCategory, getMonthly } from "../controllers/analytics.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const analyticsRouter = Router();

analyticsRouter.use(authorize);

analyticsRouter.get("/overview", getOverview);
analyticsRouter.get("/by-category", getByCategory);
analyticsRouter.get("/monthly", getMonthly);

export default analyticsRouter;
