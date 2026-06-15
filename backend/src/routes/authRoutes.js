import express from "express";

import {
  register,
  login,
  getProfile,
} from "../controllers/authController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  registerSchema,
  loginSchema,
} from "../validations/authValidation.js";

import { validate } from "../middleware/validate.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kamalesh
 *               email:
 *                 type: string
 *                 example: kamal@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User Registered Successfully
 *       400:
 *         description: Validation Error or User Already Exists
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/register",
  validate(registerSchema),
  register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: kamal@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login Successful
 *       401:
 *         description: Invalid Credentials
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/login",
  validate(loginSchema),
  login
);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get logges in user Profile
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User Profile Retrieved Successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User Not Found
 */
router.get(
  "/profile",
  authMiddleware,
  getProfile
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *      summary: Logout User
 *      tags:
 *        - Authentication
 *      responses:
 *        200:
 *          description: Logout Successful
*/
router.post("/logout", (req, res) => {
res.status(200).json({
success: true,
message: "Logout Successful",
});
});

export default router;