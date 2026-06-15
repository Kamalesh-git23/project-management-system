import {
  uploadAttachment,
  deleteAttachment,
} from "../api/attachmentApi";

const attachmentService = {
  uploadAttachment: async (
    taskId,
    formData
  ) => {
    return await uploadAttachment(
      taskId,
      formData
    );
  },

  deleteAttachment: async (
    id
  ) => {
    return await deleteAttachment(id);
  },
};

export default attachmentService;