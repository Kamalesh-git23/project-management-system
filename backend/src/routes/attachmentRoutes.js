import express from "express";

import {
  uploadAttachment,
  deleteAttachment,
} from "../controllers/attachmentController.js";

import upload from "../middleware/uploadMiddleware.js";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Attachments
 *   description: Task Attachment Management
 */

/**
 * @swagger
 * /api/attachments/upload/{taskId}:
 *   post:
 *     summary: Upload attachment to a task
 *     tags:
 *       - Attachments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Attachment uploaded successfully
 *       400:
 *         description: Invalid file or no file uploaded
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found
 */
router.post(
  "/upload/:taskId",
  upload.single("file"),
  uploadAttachment
);

/**
 * @swagger
 * /api/attachments/{id}:
 *   delete:
 *     summary: Delete attachment
 *     tags:
 *       - Attachments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Attachment ID
 *     responses:
 *       200:
 *         description: Attachment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Attachment not found
 */
router.delete(
  "/:id",
  deleteAttachment
);

export default router;