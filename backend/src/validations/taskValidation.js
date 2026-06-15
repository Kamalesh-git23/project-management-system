import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim()
      .min(3, "Title must be atleast 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

  description: z.string().trim()
      .min(5, "Description is required")
      .max(1000, "Description cannot exceed 1000 characters"),

  type: z.string().trim().min(1, "Task type is required"),

  priority: z.enum(["High","Medium","Low",]),

  state: z.enum(["Todo","In Progress","Waiting","Done",]),

  dueDate: z.string(),

  dueTime: z.string(),

  projectId: z.coerce.number(),
});