import express from "express";

import { createProject, getProjects, getProjectById, updateProject, deleteProject} from "../controllers/projectController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { projectSchema } from "../validations/projectValidation.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create Project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project Created Successfully
 */
router.post( "/", validate(projectSchema), createProject);


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get All Projects
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects Retrieved Successfully
 */
router.get("/", getProjects);


/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get Project By ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project Retrieved Successfully
 */
router.get("/:id", getProjectById);


/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update Project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project Updated Successfully
 */
router.put( "/:id", validate(projectSchema), updateProject);


/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete Project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project Deleted Successfully
 */
router.delete("/:id", deleteProject);

export default router;