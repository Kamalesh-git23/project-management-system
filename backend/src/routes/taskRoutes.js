import express from "express";

import { createTask, getTasks, getTaskById, updateTask, deleteTask, updateTaskState, addNote, deleteNote } from "../controllers/taskController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { validate } from "../middleware/validate.js";

import { taskSchema } from "../validations/taskValidation.js";

const router = express.Router();

router.use(authMiddleware);

router.post( "/", validate(taskSchema), createTask);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.put( "/:id", validate(taskSchema), updateTask);

router.delete("/:id", deleteTask);

router.patch("/:id/state", updateTaskState);

router.post("/:id/notes", addNote );

router.delete( "/:id/notes/:noteId", deleteNote);

export default router;