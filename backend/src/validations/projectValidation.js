import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().trim()
      .min(3, "Project name must be atleast 3 characters")
      .max(100, "Project name cannot exceed 100 characters"),

  description: z.string().trim()
      .min( 10, "Description must be at least 10 characters")
      .max( 1000, "Description cannot exceed 1000 characters"),

  type: z.string().trim().min(1, "Project type is required"),

  startDate: z.string(),

  endDate: z.string(),

  priority: z.enum([ "High", "Medium", "Low",]),

  teamMembers: z.string().trim().min( 1, "Team members are required"),

  status: z.enum([ "Active", "Completed", "On Hold",]),
});