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
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - type
 *               - startDate
 *               - endDate
 *               - priority
 *               - teamMembers
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: E-Commerce Website
 *               description:
 *                 type: string
 *                 example: Build a complete e-commerce platform
 *               type:
 *                 type: string
 *                 example: Web Development
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-31
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               teamMembers:
 *                 type: string
 *                 example: Kamalesh, John, David
 *               status:
 *                 type: string
 *                 enum: [Active, Completed, On Hold]
 *     responses:
 *       201:
 *         description: Project Created Successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post( "/", validate(projectSchema), createProject);


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects of logged-in user
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects Retrieved Successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getProjects);


/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project Retrieved Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getProjectById);


/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - type
 *               - startDate
 *               - endDate
 *               - priority
 *               - teamMembers
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               teamMembers:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Completed, On Hold]
 *     responses:
 *       200:
 *         description: Project Updated Successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put( "/:id", validate(projectSchema), updateProject);


/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", deleteProject);

export default router;