import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const authMiddleware =
  async (req, res, next) => {
    try {
      const authHeader =
        req.headers.authorization;

      if (
        !authHeader ||
        !authHeader.startsWith(
          "Bearer "
        )
      ) {
        throw new AppError(
          "Authentication Required",
          401
        );
      }

      const token =
        authHeader.split(" ")[1];

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
          },
        });

      if (!user) {
        throw new AppError(
          "User not found",
          404
        );
      }

      req.user = user;

      next();
    } catch (error) {
      next(
        new AppError(
          "Invalid or Expired Token",
          401
        )
      );
    }
  };