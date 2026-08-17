import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import express from "express";
import userRouter from "../../routes/user.routes.js";
import authRouter from "../../routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

describe("Users API", () => {
  const testUser = {
    name: "Test User",
    email: `test-users-${Date.now()}@example.com`,
    password: "password123",
  };

  let authToken = "";
  let userId = "";

  beforeAll(async () => {
    const res = await request(app).post("/api/v1/auth/sign-up").send(testUser);
    authToken = res.body.data.token;
    userId = res.body.data.user.id;
  });

  describe("GET /api/v1/users", () => {
    it("should list users with pagination", async () => {
      const res = await request(app).get("/api/v1/users");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.total).toBeGreaterThanOrEqual(1);
    });

    it("should respect page and limit params", async () => {
      const res = await request(app).get("/api/v1/users?page=1&limit=1");

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeLessThanOrEqual(1);
      expect(res.body.pagination.limit).toBe(1);
    });
  });

  describe("GET /api/v1/users/:id", () => {
    it("should get user by ID with auth token", async () => {
      const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(userId);
      expect(res.body.data.password).toBeUndefined();
    });

    it("should reject unauthorized request", async () => {
      const res = await request(app).get(`/api/v1/users/${userId}`);

      expect(res.status).toBe(401);
    });

    it("should return 404 for non-existent user", async () => {
      const res = await request(app)
        .get("/api/v1/users/non-existent-id")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.status).toBe(404);
    });
  });
});
