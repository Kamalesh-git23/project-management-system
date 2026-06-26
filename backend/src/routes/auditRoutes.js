import express from "express";

import {
  getAuditLogs,
  getMyAuditLogs,
} from "../controllers/auditController.js";

import {
  authMiddleware,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.use(
  authMiddleware
);

router.get(
  "/my",
  getMyAuditLogs
);

router.get(
  "/project/:projectId",
  getAuditLogs
);

export default router;