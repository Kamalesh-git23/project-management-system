import { z } from "zod";

export const registerSchema = z.object({
    name: z.string()
        .min(3, "Name must be atleast 3 characters ")
        .max(50, "Name Cannot exceed 50 characters "),

    email: z.string().trim().email("Invalid email address"),

    password: z.string()
            .min(6, "Password must be atleast 6 characters")
            .max(100, "Password cannot exceed 100 characters")
});

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});