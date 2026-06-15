import api from "./axios";

export const uploadAttachment = (
  taskId,
  formData
) =>
  api.post(
    `/attachments/upload/${taskId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

export const deleteAttachment = (
  id
) =>
  api.delete(`/attachments/${id}`);