import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import express from "express";
import authRouter from "../../routes/auth.routes.js";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../../config/env.js";

const adapter = new PrismaPg(DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

describe("Auth API", () => {
  const testUser = {
    name: "Test User",
    email: `test-auth-${Date.now()}@example.com`,
    password: "password123",
  };

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  describe("POST /api/v1/auth/sign-up", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data.user.password).toBeUndefined();
    });

    it("should reject duplicate email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(testUser);

      expect(res.status).toBe(409);
    });

    it("should reject invalid email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send({ ...testUser, email: "not-an-email", password: "password123" });

      expect(res.status).toBe(400);
    });

    it("should reject short password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send({ ...testUser, email: "short@example.com", password: "123" });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/v1/auth/sign-in", () => {
    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-in")
        .send({ email: testUser.email, password: testUser.password });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.password).toBeUndefined();
    });

    it("should reject wrong password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-in")
        .send({ email: testUser.email, password: "wrongpassword" });

      expect(res.status).toBe(401);
    });

    it("should reject non-existent user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-in")
        .send({ email: "nobody@example.com", password: "password123" });

      expect(res.status).toBe(401);
    });
  });
});
