import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskState,
  addNote,
  deleteNote,
} from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { taskSchema } from "../validations/taskValidation.js";

const router = express.Router();

/* ===========================
   Protected Routes
=========================== */

router.use(authMiddleware);

/* ===========================
   Create Task
=========================== */

router.post(
  "/",
  validate(taskSchema),
  createTask
);

/* ===========================
   Get All Tasks
=========================== */

router.get(
  "/",
  getTasks
);

/* ===========================
   Get Single Task
=========================== */

router.get(
  "/:id",
  getTaskById
);

/* ===========================
   Update Task
=========================== */

router.put(
  "/:id",
  validate(taskSchema),
  updateTask
);

/* ===========================
   Delete Task
=========================== */

router.delete(
  "/:id",
  deleteTask
);

/* ===========================
   Update Task State
   Used in Kanban Drag & Drop
=========================== */

router.patch(
  "/:id/state",
  updateTaskState
);

/* ===========================
   Add Note
=========================== */

router.post(
  "/:id/notes",
  addNote
);

/* ===========================
   Delete Note
=========================== */

router.delete(
  "/:id/notes/:noteId",
  deleteNote
);

export default router;