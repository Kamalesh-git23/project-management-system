import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

import auditLogger from "../utils/auditLogger.js";
/* ==========================
   CREATE PROJECT
========================== */
export const createProject = asyncHandler(
  async (req, res) => {
    const {
      sharedUsers = [],
      projectMode = "MY_PROJECT",
      ...projectData
    } = req.body;

    // Shared project must have users
    if (
      projectMode === "SHARED_PROJECT" &&
      sharedUsers.length === 0
    ) {
      throw new AppError(
        "Please select at least one user for shared project",
        400
      );
    }

    const uniqueUsers = [
      ...new Set(sharedUsers),
    ];

    const project =
      await prisma.project.create({
        data: {
          ...projectData,
          startDate: new Date(
            projectData.startDate
          ),
          endDate: new Date(
            projectData.endDate
          ),
          ownerId: req.user.id,
          projectMode,
        },
      });

    // Add shared members
    if (
      projectMode ===
        "SHARED_PROJECT" &&
      uniqueUsers.length > 0
    ) {
      await prisma.projectMember.createMany({
        data:
          uniqueUsers.map(
            (userId) => ({
              projectId:
                project.id,
              userId:
                Number(userId),
            })
          ),
      });
    }

    await auditLogger({
      userId: req.user.id,
      projectId: project.id,
      action: "PROJECT_CREATED",
      details: `Created project "${project.name}"`
    });

    const createdProject =
      await prisma.project.findUnique({
        where: {
          id: project.id,
        },
        include: {
          owner: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          members: {
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
          },
        },
      });

    res.status(201).json({
      success: true,
      message:
        "Project created successfully",
      project:
        createdProject,
    });
  }
);

/* ==========================
   GET ALL PROJECTS
========================== */
export const getProjects =
  asyncHandler(
    async (req, res) => {
      const projects =
        await prisma.project.findMany({
          where: {
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
          include: {
            owner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
            members: {
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
            },
          },
          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.status(200).json({
        success: true,
        projects,
      });
    }
  );

/* ==========================
   MY PROJECTS
========================== */
export const getMyProjects =
  asyncHandler(
    async (req, res) => {
      const projects =
        await prisma.project.findMany({
          where: {
            ownerId:
              req.user.id,
          },
          include: {
            members: true,
          },
          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.status(200).json({
        success: true,
        projects,
      });
    }
  );

/* ==========================
   SHARED PROJECTS
========================== */
export const getSharedProjects =
  asyncHandler(
    async (req, res) => {
      const projects =
        await prisma.project.findMany({
          where: {
            members: {
              some: {
                userId:
                  req.user.id,
              },
            },
          },
          include: {
            owner: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt:
              "desc",
          },
        });

      res.status(200).json({
        success: true,
        projects,
      });
    }
  );

/* ==========================
   GET PROJECT BY ID
========================== */
export const getProjectById =
  asyncHandler(
    async (req, res) => {
      const project =
        await prisma.project.findFirst({
          where: {
            id: Number(
              req.params.id
            ),
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
          include: {
            owner: true,
            members: {
              include: {
                user: true,
              },
            },
            tasks: true,
          },
        });

      if (!project) {
        throw new AppError(
          "Project not found",
          404
        );
      }

      res.status(200).json({
        success: true,
        project,
      });
    }
  );

/* ==========================
   UPDATE PROJECT
========================== */
export const updateProject =
  asyncHandler(
    async (req, res) => {
      const {
        sharedUsers = [],
        ...projectData
      } = req.body;

      const project =
        await prisma.project.findFirst({
          where: {
            id: Number(
              req.params.id
            ),
            ownerId:
              req.user.id,
          },
        });

      if (!project) {
        throw new AppError(
          "Only project owner can edit project",
          403
        );
      }

      const updatedProject =
        await prisma.project.update({
          where: {
            id: Number(
              req.params.id
            ),
          },
          data: {
            ...projectData,
            startDate:
              new Date(
                projectData.startDate
              ),
            endDate:
              new Date(
                projectData.endDate
              ),
          },
        });

      // Update shared users
      await prisma.projectMember.deleteMany(
        {
          where: {
            projectId:
              updatedProject.id,
          },
        }
      );

      if (
        updatedProject.projectMode ===
          "SHARED_PROJECT" &&
        sharedUsers.length > 0
      ) {
        const uniqueUsers =
          [
            ...new Set(
              sharedUsers
            ),
          ];

        await prisma.projectMember.createMany(
          {
            data:
              uniqueUsers.map(
                (
                  userId
                ) => ({
                  projectId:
                    updatedProject.id,
                  userId:
                    Number(
                      userId
                    ),
                })
              ),
          }
        );
      }

      await auditLogger({
        userId: req.user.id,
        projectId: updatedProject.id,
        action: "PROJECT_UPDATED",
        details: `Updated project "${updatedProject.name}"`,
      });

      res.status(200).json({
        success: true,
        message:
          "Project updated successfully",
        project:
          updatedProject,
      });
    }
  );

/* ==========================
   DELETE PROJECT
========================== */
export const deleteProject =
  asyncHandler(
    async (req, res) => {
      const project =
        await prisma.project.findFirst({
          where: {
            id: Number(
              req.params.id
            ),
            ownerId:
              req.user.id,
          },
        });

      if (!project) {
        throw new AppError(
          "Only project owner can delete project",
          403
        );
      }

      await auditLogger({
            userId:
              req.user.id,
            projectId:
              project.id,
            action:
              "PROJECT_DELETED",
            details: `Deleted project "${project.name}"`        
      });

      await prisma.project.delete({
        where: {
          id: project.id,
        },
      });

      res.status(200).json({
        success: true,
        message:
          "Project deleted successfully",
      });
    }
  );