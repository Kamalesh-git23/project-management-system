import express from "express";

import { createProject, getProjects, getProjectById, updateProject, deleteProject} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validate.js";

import { projectSchema } from "../validations/projectValidation.js";

const router = express.Router();

router.use(authMiddleware);

router.post( "/", validate(projectSchema), createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.put( "/:id", validate(projectSchema), updateProject);

router.delete("/:id", deleteProject);

export default router;