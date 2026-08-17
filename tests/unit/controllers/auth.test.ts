import { describe, it, expect } from "vitest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Unit tests for auth helper logic (not DB-dependent)

describe("Auth utilities", () => {
  const JWT_SECRET = "test-secret";

  it("should hash password correctly", async () => {
    const password = "testpassword123";
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    expect(hashed).not.toBe(password);
    expect(await bcrypt.compare(password, hashed)).toBe(true);
  });

  it("should generate and verify JWT token", () => {
    const payload = { userId: "test-user-id" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    expect(decoded.userId).toBe("test-user-id");
  });

  it("should reject invalid JWT token", () => {
    const token = jwt.sign({ userId: "test" }, JWT_SECRET, { expiresIn: "1h" });

    expect(() => jwt.verify(token, "wrong-secret")).toThrow();
  });
});
