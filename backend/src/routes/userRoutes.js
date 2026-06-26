import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/",
  getUsers
);

export default router;