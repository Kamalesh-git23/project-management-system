import prisma from "../config/prisma.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUsers =
  asyncHandler(async (req, res) => {
    const users =
        await prisma.user.findMany({
            where: {
            id: {
                not: req.user.id,
            },
            },
            select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            },
            orderBy: {
            firstName: "asc",
            },
        });

    res.status(200).json({
      success: true,
      users,
    });
  });