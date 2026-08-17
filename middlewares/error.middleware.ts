import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: string;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    // Prisma bad request
    if (err.name === "PrismaClientKnownRequestError") {
      const message = "Resource not found";
      error = new Error(message) as AppError;
      error.statusCode = 404;
    }

    // Prisma unique constraint violation
    if (err.code === "P2002") {
      const message = "Duplicate field value entered";
      error = new Error(message) as AppError;
      error.statusCode = 400;
    }

    // Prisma record not found
    if (err.code === "P2025") {
      const message = "Resource not found";
      error = new Error(message) as AppError;
      error.statusCode = 404;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
