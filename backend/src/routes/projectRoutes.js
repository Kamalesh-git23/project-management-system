import express from "express";

import {
  createProject,
  getProjects,
  getMyProjects,
  getSharedProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { projectSchema } from "../validations/projectValidation.js";

const router = express.Router();

/* ===========================
   Protected Routes
=========================== */

router.use(authMiddleware);

/* ===========================
   Create Project
=========================== */
router.post(
  "/",
  validate(projectSchema),
  createProject
);

/* ===========================
   Get All Accessible Projects
   (My Projects + Shared Projects)
=========================== */
router.get(
  "/",
  getProjects
);

/* ===========================
   Get Only My Projects
=========================== */
router.get(
  "/my-projects",
  getMyProjects
);

/* ===========================
   Get Only Shared Projects
=========================== */
router.get(
  "/shared-projects",
  getSharedProjects
);

/* ===========================
   Get Single Project
=========================== */
router.get(
  "/:id",
  getProjectById
);

/* ===========================
   Update Project
   (Owner Only)
=========================== */
router.put(
  "/:id",
  validate(projectSchema),
  updateProject
);

/* ===========================
   Delete Project
   (Owner Only)
=========================== */
router.delete(
  "/:id",
  deleteProject
);

export default router;