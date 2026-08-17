import { Request } from "express";
import { Prisma } from "../generated/prisma/client.js";

export interface AuthRequest extends Request {
  user?: Prisma.UserGetPayload<{
    select: { id: true; name: true; email: true; createdAt: true; updatedAt: true };
  }>;
}

export interface JwtPayload {
  userId: string;
}
