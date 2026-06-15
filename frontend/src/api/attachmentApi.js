import api from "./axios";

export const uploadAttachment =
  async (
    taskId,
    formData
  ) => {
    return await api.post(
      `/attachments/upload/${taskId}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };

export const deleteAttachment =
  async (id) => {
    return await api.delete(
      `/attachments/${id}`
    );
  };