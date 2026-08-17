import { Response, NextFunction } from "express";
import prisma from "../database/prisma.js";
import { AuthRequest } from "../types/index.js";

export const getSubscriptions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: req.params.id as string },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    if (!subscription) {
      const error = new Error("Subscription not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, price, currency, frequency, category, paymentMethod, startDate, renewalDate } = req.body;

    const renewalPeriod: Record<string, number> = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const computedRenewalDate = renewalDate || new Date(new Date(startDate).getTime() + renewalPeriod[frequency] * 86400000);

    const subscription = await prisma.subscription.create({
      data: {
        name,
        price,
        currency,
        frequency,
        category,
        paymentMethod,
        startDate: new Date(startDate),
        renewalDate: computedRenewalDate,
        userId: req.user!.id,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.subscription.findUnique({ where: { id: req.params.id as string } });

    if (!existing) {
      const error = new Error("Subscription not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    if (existing.userId !== req.user!.id) {
      const error = new Error("Not authorized to update this subscription") as Error & { statusCode: number };
      error.statusCode = 403;
      throw error;
    }

    const subscription = await prisma.subscription.update({
      where: { id: req.params.id as string },
      data: req.body,
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.subscription.findUnique({ where: { id: req.params.id as string } });

    if (!existing) {
      const error = new Error("Subscription not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    if (existing.userId !== req.user!.id) {
      const error = new Error("Not authorized to delete this subscription") as Error & { statusCode: number };
      error.statusCode = 403;
      throw error;
    }

    await prisma.subscription.delete({ where: { id: req.params.id as string } });

    res.status(200).json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: req.params.id as string },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.subscription.findUnique({ where: { id: req.params.id as string } });

    if (!existing) {
      const error = new Error("Subscription not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    if (existing.userId !== req.user!.id) {
      const error = new Error("Not authorized to cancel this subscription") as Error & { statusCode: number };
      error.statusCode = 403;
      throw error;
    }

    const subscription = await prisma.subscription.update({
      where: { id: req.params.id as string },
      data: { status: "canceled" },
    });

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUpcomingRenewals = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    const subscriptions = await prisma.subscription.findMany({
      where: {
        status: "active",
        renewalDate: {
          gte: now,
          lte: thirtyDaysFromNow,
        },
      },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { renewalDate: "asc" },
    });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
