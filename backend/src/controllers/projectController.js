import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProject = asyncHandler(
  async (req, res) => {
    const project = await prisma.project.create({
      data: {
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        ownerId: req.user.id,
      },
    });

    res.status(201).json(project);
  }
);

export const getProjects = asyncHandler(
  async (req, res) => {
    const projects =
      await prisma.project.findMany({
        where: {
          ownerId: req.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(projects);
  }
);

export const getProjectById =
  asyncHandler(async (req, res) => {
    const project =
      await prisma.project.findFirst({
        where: {
          id: Number(req.params.id),
          ownerId: req.user.id,
        },
      });

    if (!project) {
      throw new AppError( "Project Not Found", 404);
    }

    res.json(project);
  });

export const updateProject =
  asyncHandler(async (req, res) => {
    const existingProject =
      await prisma.project.findFirst({
        where: {
          id: Number(req.params.id),
          ownerId: req.user.id,
        },
      });

    if (!existingProject) {
      throw new AppError( "Project Not Found", 404);
    }

    const project =
      await prisma.project.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          ...req.body,
          startDate: new Date(req.body.startDate),
          endDate: new Date(req.body.endDate),
        },
      });

    res.json(project);
  });

export const deleteProject =
  asyncHandler(async (req, res) => {
    const existingProject =
      await prisma.project.findFirst({
        where: {
          id: Number(req.params.id),
          ownerId: req.user.id,
        },
      });

    if (!existingProject) {
      throw new AppError( "Project Not Found", 404);
    }

    await prisma.project.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({ message:"Project Deleted Successfully",});
  });