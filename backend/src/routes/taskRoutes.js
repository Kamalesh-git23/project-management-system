import express from "express";

import { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskState, addNote, deleteNote} from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { taskSchema } from "../validations/taskValidation.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *               - priority
 *               - state
 *               - dueDate
 *               - dueTime
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design Login Page
 *               description:
 *                 type: string
 *                 example: Create responsive login page UI
 *               type:
 *                 type: string
 *                 example: Feature
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               state:
 *                 type: string
 *                 enum: [Todo, In Progress, Waiting, Done]
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-30
 *               dueTime:
 *                 type: string
 *                 example: 18:00
 *               projectId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Task Created Successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/", validate(taskSchema),createTask );

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks Retrieved Successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task Retrieved Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               state:
 *                 type: string
 *                 enum: [Todo, In Progress, Waiting, Done]
 *               dueDate:
 *                 type: string
 *                 format: date
 *               dueTime:
 *                 type: string
 *               projectId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Task Updated Successfully
 *       400:
 *         description: Validation Error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put( "/:id", validate(taskSchema), updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", deleteTask);

/**
 * @swagger
 * /api/tasks/{id}/state:
 *   patch:
 *     summary: Update task state
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - state
 *             properties:
 *               state:
 *                 type: string
 *                 enum: [Todo, In Progress, Waiting, Done]
 *                 example: In Progress
 *     responses:
 *       200:
 *         description: Task State Updated Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id/state", updateTaskState);

/**
 * @swagger
 * /api/tasks/{id}/notes:
 *   post:
 *     summary: Add note to task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Complete UI before Friday
 *     responses:
 *       201:
 *         description: Note Added Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:id/notes", addNote);

/**
 * @swagger
 * /api/tasks/{id}/notes/{noteId}:
 *   delete:
 *     summary: Delete task note
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: Note ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Note Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id/notes/:noteId",deleteNote);

export default router;