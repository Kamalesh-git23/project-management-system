import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import auditLogger from "../utils/auditLogger.js";

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
      throw new AppError(
        "User not found",
        404
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  });

export const updateProfile =
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      description,
      image,
    } = req.body;

    const user =
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          firstName,
          lastName,
          description,
          image,
        },
      });

    await auditLogger({
        userId: req.user.id,
        action:
          "PROFILE_UPDATED",
        details:
          "Updated profile",
    });

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user,
    });
  });