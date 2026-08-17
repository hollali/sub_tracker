import { Request, Response, NextFunction } from "express";

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const parsePagination = (query: PaginationQuery) => {
  const page = Math.max(1, parseInt(query.page || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || "10", 10) || 10));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};
