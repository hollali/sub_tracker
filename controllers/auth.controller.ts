import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import prisma from "../database/prisma.js";

const userSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      const error = new Error("User already exists") as Error & { statusCode: number };
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: userSelect,
    });

    const token = jwt.sign({ userId: newUser.id } as object, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as string,
    } as jwt.SignOptions);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: newUser },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error("Invalid email or password") as Error & { statusCode: number };
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password") as Error & { statusCode: number };
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user.id } as object, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as string,
    } as jwt.SignOptions);

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { token, user: userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
