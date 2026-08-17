import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import express from "express";
import authRouter from "../../routes/auth.routes.js";
import subscriptionRouter from "../../routes/subscription.routes.js";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

describe("Subscriptions API", () => {
  const testUser = {
    name: "Sub Test User",
    email: `sub-test-${Date.now()}@example.com`,
    password: "password123",
  };

  const testSubscription = {
    name: "Netflix",
    price: 15.99,
    currency: "USD",
    frequency: "monthly",
    category: "entertainment",
    paymentMethod: "credit card",
    startDate: "2024-01-15",
  };

  let authToken = "";

  beforeAll(async () => {
    const res = await request(app).post("/api/v1/auth/sign-up").send(testUser);
    authToken = res.body.data.token;
  });

  it("should create a subscription", async () => {
    const res = await request(app)
      .post("/api/v1/subscriptions")
      .set("Authorization", `Bearer ${authToken}`)
      .send(testSubscription);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Netflix");
    expect(res.body.data.status).toBe("active");
  });

  it("should reject without auth token", async () => {
    const res = await request(app)
      .post("/api/v1/subscriptions")
      .send(testSubscription);

    expect(res.status).toBe(401);
  });

  it("should reject invalid data", async () => {
    const res = await request(app)
      .post("/api/v1/subscriptions")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "A" });

    expect(res.status).toBe(400);
  });

  it("should list subscriptions with pagination", async () => {
    const res = await request(app)
      .get("/api/v1/subscriptions")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.pagination).toBeDefined();
  });

  it("should filter by status", async () => {
    const res = await request(app)
      .get("/api/v1/subscriptions?status=active")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.every((s: { status: string }) => s.status === "active")).toBe(true);
  });

  it("should search by name", async () => {
    const res = await request(app)
      .get("/api/v1/subscriptions?search=netflix")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("should cancel a subscription", async () => {
    const createRes = await request(app)
      .post("/api/v1/subscriptions")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ ...testSubscription, name: "Hulu" });

    expect(createRes.status).toBe(201);
    const subId = createRes.body.data.id;

    const res = await request(app)
      .put(`/api/v1/subscriptions/${subId}/cancel`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("canceled");
  });
});
