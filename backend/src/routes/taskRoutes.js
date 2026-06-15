import express from "express";

import { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskState, addNote, deleteNote } from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { taskSchema } from "../validations/taskValidation.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create Task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task Created Successfully
 */
router.post( "/", validate(taskSchema), createTask);


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get All Tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks Retrieved Successfully
 */
router.get("/", getTasks);


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get Task By ID
 *     tags:
 *       - Tasks
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
 *         description: Task Retrieved Successfully
 */
router.get("/:id", getTaskById);


/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update Task
 *     tags:
 *       - Tasks
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
 *         description: Task Updated Successfully
 */
router.put( "/:id", validate(taskSchema), updateTask);


/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete Task
 *     tags:
 *       - Tasks
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
 *         description: Task Deleted Successfully
 */
router.delete("/:id", deleteTask);


/**
 * @swagger
 * /api/tasks/{id}/state:
 *   patch:
 *     summary: Update Task State
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task State Updated
 */
router.patch("/:id/state", updateTaskState);


/**
 * @swagger
 * /api/tasks/{id}/notes:
 *   post:
 *     summary: Add Task Note
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Note Added Successfully
 */
router.post("/:id/notes", addNote );


/**
 * @swagger
 * /api/tasks/{id}/notes/{noteId}:
 *   delete:
 *     summary: Delete Task Note
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Note Deleted Successfully
 */
router.delete( "/:id/notes/:noteId", deleteNote);

export default router;