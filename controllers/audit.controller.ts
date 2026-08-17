import { Response, NextFunction } from "express";
import prisma from "../database/prisma.js";
import { AuthRequest } from "../types/index.js";

const createAuditLog = async (
  action: string,
  entity: string,
  entityId: string,
  userId: string | undefined,
  oldValues?: Record<string, unknown>,
  newValues?: Record<string, unknown>
) => {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        userId: userId || null,
        oldValues: oldValues as never,
        newValues: newValues as never,
      },
    });
  } catch (err) {
    console.error("Failed to create audit log:", err);
  }
};

export const getAuditLogs = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string || "1", 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string || "20", 10) || 20));
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.auditLog.count(),
    ]);

    res.status(200).json({
      success: true,
      data: logs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

export { createAuditLog };
