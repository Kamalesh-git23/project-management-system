import api from "./axios";

export const getTasks =
  async () => {
    return await api.get(
      "/tasks"
    );
  };

export const getTaskById =
  async (id) => {
    return await api.get(
      `/tasks/${id}`
    );
  };

export const createTask =
  async (data) => {
    return await api.post(
      "/tasks",
      data
    );
  };

export const updateTask =
  async (id, data) => {
    return await api.put(
      `/tasks/${id}`,
      data
    );
  };

export const deleteTask =
  async (id) => {
    return await api.delete(
      `/tasks/${id}`
    );
  };

export const updateTaskState =
  async (id, state) => {
    return await api.patch(
      `/tasks/${id}/state`,
      { state }
    );
  };

export const addNote =
  async (
    taskId,
    content
  ) => {
    return await api.post(
      `/tasks/${taskId}/notes`,
      { content }
    );
  };

export const deleteNote =
  async (
    taskId,
    noteId
  ) => {
    return await api.delete(
      `/tasks/${taskId}/notes/${noteId}`
    );
  };