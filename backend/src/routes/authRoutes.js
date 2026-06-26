import express from "express";

import {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/authValidation.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

/* =========================
   AUTHENTICATION
========================= */

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});

/* =========================
   PROFILE
========================= */

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

/* =========================
   PASSWORD MANAGEMENT
========================= */

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

export default router;