import { Request, Response, NextFunction } from "express";
import prisma from "../database/prisma.js";

export const getOverview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalSubscriptions, activeSubscriptions, revenueResult, avgPriceResult] =
      await Promise.all([
        prisma.subscription.count(),
        prisma.subscription.count({ where: { status: "active" } }),
        prisma.subscription.aggregate({ _sum: { price: true }, where: { status: "active" } }),
        prisma.subscription.aggregate({ _avg: { price: true }, where: { status: "active" } }),
      ]);

    res.status(200).json({
      success: true,
      data: {
        totalSubscriptions,
        activeSubscriptions,
        totalRevenue: revenueResult._sum.price || 0,
        averagePrice: avgPriceResult._avg.price || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.subscription.groupBy({
      by: ["category"],
      _count: { id: true },
      _sum: { price: true },
      where: { status: "active" },
      orderBy: { _count: { id: "desc" } },
    });

    res.status(200).json({
      success: true,
      data: result.map((r) => ({
        category: r.category,
        count: r._count.id,
        totalRevenue: r._sum.price || 0,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthly = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const subscriptions = await prisma.subscription.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { price: true, createdAt: true },
    });

    const monthly: Record<string, { count: number; revenue: number }> = {};

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthly[key] = { count: 0, revenue: 0 };
    }

    for (const sub of subscriptions) {
      const key = `${sub.createdAt.getFullYear()}-${String(sub.createdAt.getMonth() + 1).padStart(2, "0")}`;
      if (monthly[key]) {
        monthly[key].count++;
        monthly[key].revenue += sub.price;
      }
    }

    res.status(200).json({
      success: true,
      data: Object.entries(monthly).map(([month, data]) => ({ month, ...data })),
    });
  } catch (error) {
    next(error);
  }
};
