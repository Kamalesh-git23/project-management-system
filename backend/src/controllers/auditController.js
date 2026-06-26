import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAuditLogs =
  asyncHandler(async (req, res) => {
    const projectId =
      Number(req.params.projectId);

    const project =
      await prisma.project.findFirst({
        where: {
          id: projectId,
          OR: [
            {
              ownerId:
                req.user.id,
            },
            {
              members: {
                some: {
                  userId:
                    req.user.id,
                },
              },
            },
          ],
        },
      });

    if (!project) {
      throw new AppError(
        "Access denied",
        403
      );
    }

    const logs =
      await prisma.auditLog.findMany({
        where: {
          projectId,
        },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.status(200).json({
      success: true,
      logs,
    });
  });

export const getMyAuditLogs =
  asyncHandler(async (req, res) => {
    const logs =
      await prisma.auditLog.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.status(200).json({
      success: true,
      logs,
    });
  });