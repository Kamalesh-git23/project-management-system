import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { generateToken } from "../utils/jwt.js";
import { sendEmail } from "../services/emailService.js";

import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import auditLogger from "../utils/auditLogger.js";

/* =========================
   REGISTER
========================= */

export const register = asyncHandler(
  async (req, res) => {
    const { firstName, lastName, email, password, description } = req.body;

    const existingUser = await prisma.user.findUnique({
                            where: { email }
                          });

    if (existingUser) {
      throw new AppError( "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          description: description || "",
          image: null
        }
      });

    await auditLogger({
        userId: user.id,
        action: "USER_REGISTERED",
        details: `${user.firstName} ${user.lastName} registered`
      
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      success: true,
      message:"User Registered Successfully",

      token,

      user: {
        id: user.id,
        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,

        image:user.image,

        description: user.description,

        role: user.role
      }
    });
  }
);

/* =========================
   LOGIN
========================= */

export const login = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const user =
      await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {
      throw new AppError( "Invalid Credentials", 401 );
    }

    const isMatch = await bcrypt.compare( password, user.password);

    if (!isMatch) {
      throw new AppError("Invalid Credentials",401);
    }

    const token = generateToken( user.id, user.role );

    await auditLogger({
        userId: user.id,
        action: "USER_LOGIN",
        details: `${user.firstName} ${user.lastName} logged in`
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      user: {
        id: user.id,
        firstName: user.firstName,

        lastName: user.lastName,

        email: user.email,

        image: user.image,

        description: user.description,

        role: user.role
      }
    });
  }
);

/* =========================
   GET PROFILE
========================= */

export const getProfile =
  asyncHandler(async (req, res) => {
    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
          description: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    if (!user) {
      throw new AppError( "User Not Found", 404);
    }

    res.status(200).json({
      success: true,
      user
    });
  });

/* =========================
   UPDATE PROFILE
========================= */

export const updateProfile =
  asyncHandler(async (req, res) => {
    const { firstName, lastName, description, image } = req.body;

    if ( !firstName || !lastName) {
      throw new AppError( "First name and last name are required", 400);
    }

    const user =
      await prisma.user.update({
        where: {
          id: req.user.id
        },
        data: {
          firstName,
          lastName,
          description,
          image
        }
      });

    await auditLogger({
        userId: req.user.id,
        action: "PROFILE_UPDATED",
        details: "User updated profile",
    });

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user
    });
  });

/* =========================
   CHANGE PASSWORD
========================= */

export const changePassword =
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.user.id
        }
      });

    const isMatch = await bcrypt.compare( currentPassword, user.password );

    if (!isMatch) {
      throw new AppError("Current password is incorrect",400);
    }

    const hashedPassword = await bcrypt.hash( newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword
      }
    });

    await auditLogger({
        userId: req.user.id,
        action: "PASSWORD_CHANGED",
        details: "User changed password",
    });

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  });

/* =========================
   FORGOT PASSWORD
========================= */
 
export const forgotPassword =
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    await prisma.passwordResetToken.deleteMany(
      {
        where: {
          userId: user.id
        }
      }
    );

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date( Date.now() +60 * 60 * 1000);

    await prisma.passwordResetToken.create(
      {
        data: {
          token,
          userId: user.id,
          expiresAt
        }
      }
    );

    const resetLink =
      `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `
        <h2>Reset Your Password</h2>

        <p>Hello ${user.firstName},</p>

        <p>
          Click the button below to reset
          your password.
        </p>

        <a
          href="${resetLink}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in
          1 hour.
        </p>
      `
    );

    res.status(200).json({
      success: true,
      message:
        "Password reset link sent to your email",
    });
  });

/* =========================
   RESET PASSWORD
========================= */

export const resetPassword =
  asyncHandler(async (req, res) => {
    const { token, password } = req.body;

    const resetToken =
      await prisma.passwordResetToken.findUnique(
        {
          where: {
            token
          }
        }
      );

    if ( !resetToken || resetToken.expiresAt < new Date()) {
      throw new AppError( "Invalid or expired token", 400 );
    }

    const hashedPassword = await bcrypt.hash( password, 10);

    await prisma.user.update({
      where: {
        id: resetToken.userId
      },
      data: {
        password: hashedPassword
      }
    });

    await auditLogger({
        userId: resetToken.userId,
        action: "PASSWORD_RESET",
        details: "User reset password"
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id
      }
    });

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully"
    });
  });