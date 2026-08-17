import { describe, it, expect } from "vitest";

describe("Renewal period calculation", () => {
  const renewalPeriod: Record<string, number> = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };

  it("should compute monthly renewal date correctly", () => {
    const startDate = new Date("2024-01-15");
    const result = new Date(startDate.getTime() + renewalPeriod.monthly * 86400000);

    expect(result.getDate()).toBe(14);
    expect(result.getMonth()).toBe(1); // February (0-indexed)
  });

  it("should compute daily renewal date correctly", () => {
    const startDate = new Date("2024-01-15");
    const result = new Date(startDate.getTime() + renewalPeriod.daily * 86400000);

    expect(result.getDate()).toBe(16);
  });

  it("should compute weekly renewal date correctly", () => {
    const startDate = new Date("2024-01-15");
    const result = new Date(startDate.getTime() + renewalPeriod.weekly * 86400000);

    expect(result.getDate()).toBe(22);
  });

  it("should compute yearly renewal date correctly", () => {
    const startDate = new Date("2024-01-15");
    const result = new Date(startDate.getTime() + renewalPeriod.yearly * 86400000);

    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(14);
  });
});
