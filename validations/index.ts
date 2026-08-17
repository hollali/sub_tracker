import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const createSubscriptionSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.number().min(0, "Price must be greater than 0"),
  currency: z.enum(["USD", "EUR", "GBP", "GHS"]).default("USD"),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]).default("monthly"),
  category: z.enum([
    "business",
    "entertainment",
    "fitness",
    "food",
    "health",
    "sports",
    "technology",
    "travel",
    "other",
  ]),
  paymentMethod: z.string().min(1),
  startDate: z.string().transform((val) => new Date(val)),
  renewalDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
});

export const updateSubscriptionSchema = createSubscriptionSchema.partial();

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
