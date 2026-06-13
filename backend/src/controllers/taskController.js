import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
    const { title, description, type, priority, state, dueDate, dueTime, projectId} = req.body;

    const project = await prisma.project.findUnique({
        where: {
            id: Number(projectId),
        },
    });

    if (!project) {
        throw new AppError("Project not found", 404);
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
            notes: true,
            attachments: true,
        },
    });

    res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await prisma.task.findMany({
        include: {
            project: true,
            notes: true,
            attachments: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    res.json(tasks);
});

export const getTaskById = asyncHandler(async (req, res) => {
    const task = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id),
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

    res.json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
    const existingTask = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id),
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
            notes: true,
            attachments: true,
        },
    });

    res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
    const existingTask = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    if (!existingTask) {
        throw new AppError("Task not found", 404);
    }

    await prisma.task.delete({
        where: {
            id: Number(req.params.id),
        },
    });

    res.json({
        message: "Task deleted successfully",
    });
});

export const updateTaskState = asyncHandler(async (req, res) => {
    const { state } = req.body;

    const task = await prisma.task.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            state,
        },
    });

    res.json(task);
});

export const addNote = asyncHandler(async (req, res) => {
    const { content } = req.body;

    const note = await prisma.note.create({
        data: {
            content,
            taskId: Number(req.params.id),
        },
    });

    res.status(201).json(note);
});

export const deleteNote = asyncHandler(async (req, res) => {
    await prisma.note.delete({
        where: {
            id: Number(req.params.noteId),
        },
    });

    res.json({
        message: "Note deleted successfully",
    });
});