import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import auditLogger from "../utils/auditLogger.js";

/* ==========================
   Create Task
========================== */

export const createTask = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    type,
    priority,
    state,
    dueDate,
    dueTime,
    projectId,
  } = req.body;

  const project = await prisma.project.findFirst({
    where: {
      id: Number(projectId),
      OR: [
        {
          ownerId: req.user.id,
        },
        {
          members: {
            some: {
              userId: req.user.id,
            },
          },
        },
      ],
    },
  });

  if (!project) {
    throw new AppError(
      "Project not found or access denied",
      404
    );
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      type,
      priority,
      state,
      dueDate: new Date(dueDate),
      dueTime,
      projectId: Number(projectId),
    },
    include: {
      project: true,
      notes: true,
      attachments: true,
    },
  });

  await auditLogger({
      userId: req.user.id,
      projectId: project.id,
      action: "TASK_CREATED",
      details: `Created task ${task.title}`,
  });

  res.status(201).json(task);
});

/* ==========================
   Get Tasks
========================== */

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: {
      project: {
        OR: [
          {
            ownerId: req.user.id,
          },
          {
            members: {
              some: {
                userId: req.user.id,
              },
            },
          },
        ],
      },
    },
    include: {
      project: true,
      notes: true,
      attachments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(tasks);
});

/* ==========================
   Get Single Task
========================== */

export const getTaskById = asyncHandler(async (req, res) => {
  const task = await prisma.task.findFirst({
    where: {
      id: Number(req.params.id),
      project: {
        OR: [
          {
            ownerId: req.user.id,
          },
          {
            members: {
              some: {
                userId: req.user.id,
              },
            },
          },
        ],
      },
    },
    include: {
      project: true,
      notes: true,
      attachments: true,
    },
  });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  res.status(200).json(task);
});

/* ==========================
   Update Task
========================== */

export const updateTask = asyncHandler(async (req, res) => {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: Number(req.params.id),
      project: {
        OR: [
          {
            ownerId: req.user.id,
          },
          {
            members: {
              some: {
                userId: req.user.id,
              },
            },
          },
        ],
      },
    },
    include: {
      project: true,
    },
  });

  if (!existingTask) {
    throw new AppError("Task not found", 404);
  }

  const task = await prisma.task.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      ...req.body,
      dueDate: req.body.dueDate
        ? new Date(req.body.dueDate)
        : existingTask.dueDate,
    },
    include: {
      project: true,
      notes: true,
      attachments: true,
    },
  });

  await auditLogger({
      userId: req.user.id,
      projectId: existingTask.projectId,
      action: "TASK_UPDATED",
      details: `Updated task ${task.title}`,
  });

  res.status(200).json(task);
});

/* ==========================
   Delete Task
========================== */

export const deleteTask = asyncHandler(async (req, res) => {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: Number(req.params.id),
      project: {
        OR: [
          {
            ownerId: req.user.id,
          },
          {
            members: {
              some: {
                userId: req.user.id,
              },
            },
          },
        ],
      },
    },
  });

  if (!existingTask) {
    throw new AppError("Task not found", 404);
  }

  await auditLogger({
      userId: req.user.id,
      projectId: existingTask.projectId,
      action: "TASK_DELETED",
      details: `Deleted task ${existingTask.title}`,
  });

  await prisma.task.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

/* ==========================
   Move Task State
========================== */

export const updateTaskState = asyncHandler(
  async (req, res) => {
    const { state } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
        project: {
          OR: [
            {
              ownerId: req.user.id,
            },
            {
              members: {
                some: {
                  userId: req.user.id,
                },
              },
            },
          ],
        },
      },
    });

    if (!existingTask) {
      throw new AppError("Task not found", 404);
    }

    const task = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        state,
      },
    });

    await auditLogger({

        userId: req.user.id,
        projectId: existingTask.projectId,
        action: "TASK_STATE_UPDATED",
        details: `${task.title} moved to ${state}`,
    });

    res.status(200).json(task);
  }
);

/* ==========================
   Add Note
========================== */

export const addNote = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const task =
    await prisma.task.findFirst({
      where: {
        id:
          Number(
            req.params.id
          ),
        project: {
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
      },
    });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const note = await prisma.note.create({
    data: {
      content,
      taskId: task.id,
      createdBy: req.user.id,
    },
  });

  await auditLogger({
      userId: req.user.id,
      projectId: task.projectId,
      action: "NOTE_CREATED",
      details: `Added note to task ${task.title}`,
  });

  res.status(201).json(note);
});

/* ==========================
   Delete Note
========================== */

export const deleteNote = asyncHandler(async (req, res) => {
  const note =
    await prisma.note.findFirst({
      where: {
        id:
          Number(
            req.params.noteId
          ),
        task: {
          project: {
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
        },
      },
      include: {
        task: true,
      },
    });

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  await auditLogger({
      userId: req.user.id,
      projectId: note.task.projectId,
      action: "NOTE_DELETED",
      details: `Deleted note from ${note.task.title}`,
  });

  await prisma.note.delete({
    where: {
      id: Number(req.params.noteId),
    },
  });

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});