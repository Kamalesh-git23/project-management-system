import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";

export const canAccessProject =
  async (req, res, next) => {
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
        "Project Access Denied",
        403
      );
    }

    next();
  };