import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "Title is required"),

  description: z.string().min(5, "Description is required"),

  type: z.string().min(1, "Task type is required"),

  priority: z.enum(["High","Medium","Low",]),

  state: z.enum(["Todo","In Progress","Waiting","Done",]),

  dueDate: z.string(),

  dueTime: z.string(),

  projectId: z.number(),
});