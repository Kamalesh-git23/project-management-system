import { z } from "zod";

export const taskSchema =
  z.object({
    title: z.string()
      .trim()
      .min(3),

    description:
      z.string()
      .trim()
      .min(5),

    type:
      z.string()
      .trim(),

    priority:
      z.enum([
        "High",
        "Medium",
        "Low",
      ]),

    state:
      z.enum([
        "Todo",
        "In Progress",
        "Waiting",
        "Done",
      ]),

    dueDate:
      z.string(),

    dueTime:
      z.string(),

    projectId:
      z.coerce.number(),
  });