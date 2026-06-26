import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

import auditLogger from "../utils/auditLogger.js";

import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

/* =====================================
   Upload Attachment
===================================== */
export const uploadAttachment = asyncHandler(
  async (req, res) => {
    const taskId = Number(req.params.taskId);

    if (!req.file) {
      throw new AppError(
        "No file uploaded",
        400
      );
    }

    const task =
      await prisma.task.findFirst({
        where: {
          id: taskId,
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
        include: {
          project: true,
        },
      });

    if (!task) {
      throw new AppError(
        "Task not found or access denied",
        404
      );
    }

    const streamUpload =
      () =>
        new Promise(
          (
            resolve,
            reject
          ) => {
            const stream =
              cloudinary.uploader.upload_stream(
                {
                  folder:
                    "project-management-system",
                },
                (
                  error,
                  result
                ) => {
                  if (
                    result
                  ) {
                    resolve(
                      result
                    );
                  } else {
                    reject(
                      error
                    );
                  }
                }
              );

            streamifier
              .createReadStream(
                req.file
                  .buffer
              )
              .pipe(
                stream
              );
          }
        );

    const result =
      await streamUpload();

    const attachment =
      await prisma.attachment.create(
        {
          data: {
            fileName:
              req.file
                .originalname,
            fileUrl:
              result.secure_url,
            publicId:
              result.public_id,
            taskId,
          },
        }
      );

    await auditLogger(
      {
          userId:
            req.user.id,
          projectId:
            task.projectId,
          action:
            "ATTACHMENT_UPLOADED",
          details: `${req.user.firstName} uploaded ${req.file.originalname} to task "${task.title}"`,
        
      }
    );

    res.status(201).json({
      success: true,
      message:
        "Attachment uploaded successfully",
      attachment,
    });
  }
);

/* =====================================
   Delete Attachment
===================================== */
export const deleteAttachment =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const attachment =
        await prisma.attachment.findUnique(
          {
            where: {
              id: Number(
                req.params.id
              ),
            },
            include: {
              task: {
                include:
                  {
                    project:
                      true,
                  },
              },
            },
          }
        );

      if (
        !attachment
      ) {
        throw new AppError(
          "Attachment not found",
          404
        );
      }

      const project =
        await prisma.project.findFirst(
          {
            where: {
              id: attachment
                .task
                .projectId,
              OR: [
                {
                  ownerId:
                    req
                      .user
                      .id,
                },
                {
                  members:
                    {
                      some:
                        {
                          userId:
                            req
                              .user
                              .id,
                        },
                    },
                },
              ],
            },
          }
        );

      if (
        !project
      ) {
        throw new AppError(
          "Access denied",
          403
        );
      }

      await cloudinary.uploader.destroy(
        attachment.publicId
      );

      await prisma.attachment.delete(
        {
          where: {
            id: attachment.id,
          },
        }
      );

      await auditLogger(
        {
         
            userId:
              req.user.id,
            projectId:
              project.id,
            action:
              "ATTACHMENT_DELETED",
            details: `${req.user.firstName} deleted ${attachment.fileName}`,
         
        }
      );

      res.json({
        success: true,
        message:
          "Attachment deleted successfully",
      });
    }
  );