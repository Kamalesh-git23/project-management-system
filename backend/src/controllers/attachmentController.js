import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const uploadAttachment = asyncHandler(
  async (req, res) => {
    const taskId = Number(req.params.taskId);

    if (!req.file) {
      throw new AppError(
        "No file uploaded",
        400
      );
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream =
          cloudinary.uploader.upload_stream(
            {
              folder:
                "project-management-system",
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier
          .createReadStream(
            req.file.buffer
          )
          .pipe(stream);
      });

    const result =
      await streamUpload();

    const attachment =
      await prisma.attachment.create({
        data: {
          fileName:
            req.file.originalname,
          fileUrl:
            result.secure_url,
          publicId:
            result.public_id,
          taskId,
        },
      });

    res.status(201).json(
      attachment
    );
  }
);

export const deleteAttachment = asyncHandler(
  async (req, res) => {
    const attachment =
      await prisma.attachment.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });

    if (!attachment) {
      throw new AppError(
        "Attachment not found",
        404
      );
    }

    await cloudinary.uploader.destroy(
      attachment.publicId
    );

    await prisma.attachment.delete({
      where: {
        id: attachment.id,
      },
    });

    res.json({
      message:
        "Attachment deleted successfully",
    });
  }
);