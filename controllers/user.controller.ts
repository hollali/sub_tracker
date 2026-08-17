import { Request, Response, NextFunction } from "express";
import prisma from "../database/prisma.js";

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({ select: userSelect });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id as string },
      select: userSelect,
    });

    if (!user) {
      const error = new Error("User not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      const error = new Error("User already exists") as Error & { statusCode: number };
      error.statusCode = 409;
      throw error;
    }

    const bcrypt = await import("bcrypt");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: userSelect,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      const error = new Error("User not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    const user = await prisma.user.update({
      where: { id: req.params.id as string },
      data: req.body,
      select: userSelect,
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await prisma.user.findUnique({ where: { id: req.params.id as string } });
    if (!existing) {
      const error = new Error("User not found") as Error & { statusCode: number };
      error.statusCode = 404;
      throw error;
    }

    await prisma.user.delete({ where: { id: req.params.id as string } });

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
