import express from "express";

import {
    uploadAttachment,
    deleteAttachment
}
from "../controllers/attachmentController.js";

import upload from "../middleware/uploadMiddleware.js";

import {
    authMiddleware
}
from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/attachments/upload/{taskId}:
 *   post:
 *     summary: Upload Attachment
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
 *     responses:
 *       201:
 *         description: File Uploaded Successfully
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
 *     summary: Delete Attachment
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
 *     responses:
 *       200:
 *         description: Attachment Deleted Successfully
 */
router.delete(
    "/:id",
    deleteAttachment
);

export default router;