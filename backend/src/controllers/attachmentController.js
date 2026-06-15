import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadAttachment = async (req, res) => {

    const taskId = Number(req.params.taskId);

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    const streamUpload = () =>
        new Promise((resolve, reject) => {

            const stream =
                cloudinary.uploader.upload_stream(
                    {
                        folder: "project-management-system",
                    },
                    (error, result) => {

                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

            streamifier.createReadStream(
                req.file.buffer
            ).pipe(stream);
        });

    const result = await streamUpload();

    const attachment =
        await prisma.attachment.create({
            data: {
                fileName: req.file.originalname,
                fileUrl: result.secure_url,
                publicId: result.public_id,
                taskId,
            },
        });

    res.status(201).json(attachment);
};

export const deleteAttachment =
async (req, res) => {

    const attachment =
        await prisma.attachment.findUnique({
            where:{
                id:Number(req.params.id)
            }
        });

    if(!attachment){
        return res.status(404).json({
            message:"Attachment not found"
        });
    }

    await cloudinary.uploader.destroy(
        attachment.publicId
    );

    await prisma.attachment.delete({
        where:{
            id:attachment.id
        }
    });

    res.json({
        message:
            "Attachment deleted successfully"
    });
};