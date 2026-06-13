import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, "Project name is required"),

  description: z.string().min( 10, "Description must be at least 10 characters"),

  type: z.string().min(1, "Project type is required"),

  startDate: z.string(),

  endDate: z.string(),

  priority: z.enum([ "High", "Medium", "Low",]),

  teamMembers: z.string().min( 1, "Team members are required"),

  status: z.enum([ "Active", "Completed", "On Hold",]),
});