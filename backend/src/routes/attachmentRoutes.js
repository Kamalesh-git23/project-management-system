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
 *         description: Task ID
 *         schema:
 *           type: integer
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
 *         description: File Uploaded Successfully
 *       400:
 *         description: No File Uploaded or Invalid File
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task Not Found
 *       500:
 *         description: Internal Server Error
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
 *         description: Attachment ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Attachment Deleted Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Attachment Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  deleteAttachment
);

export default router;