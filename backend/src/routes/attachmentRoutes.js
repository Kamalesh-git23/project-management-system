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

router.post(
    "/upload/:taskId",
    upload.single("file"),
    uploadAttachment
);

router.delete(
    "/:id",
    deleteAttachment
);

export default router;