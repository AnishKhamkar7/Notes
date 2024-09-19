import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().trim().email("Invalid Email Address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long"),
  })
  .strict();

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be more than 3 characters"),
    email: z.string().trim().email("Invalid Email Address"),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters long"),
  })
  .strict();

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
