import { z } from "zod";

export const projectSchema =
  z.object({
    name: z.string()
      .trim()
      .min(3),

    description: z.string()
      .trim()
      .min(10),

    type: z.string()
      .trim()
      .min(1),

    startDate:
      z.string(),

    endDate:
      z.string(),

    priority:
      z.enum([
        "High",
        "Medium",
        "Low",
      ]),

    teamMembers:
      z.string(),

    status:
      z.enum([
        "Active",
        "Completed",
        "On Hold",
      ]),

    projectMode:
      z.enum([
        "MY_PROJECT",
        "SHARED_PROJECT",
      ])
      .optional(),

    sharedUsers:
      z.array(
        z.number()
      )
      .optional(),
  });