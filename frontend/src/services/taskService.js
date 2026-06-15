import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskState,
  addNote,
  deleteNote,
} from "../api/taskApi";

const taskService = {
  getTasks: async () => {
    return await getTasks();
  },

  getTaskById: async (id) => {
    return await getTaskById(id);
  },

  createTask: async (data) => {
    return await createTask(data);
  },

  updateTask: async (
    id,
    data
  ) => {
    return await updateTask(
      id,
      data
    );
  },

  deleteTask: async (id) => {
    return await deleteTask(id);
  },

  updateTaskState: async (
    id,
    state
  ) => {
    return await updateTaskState(
      id,
      state
    );
  },

  addNote: async (
    taskId,
    content
  ) => {
    return await addNote(
      taskId,
      content
    );
  },

  deleteNote: async (
    taskId,
    noteId
  ) => {
    return await deleteNote(
      taskId,
      noteId
    );
  },
};

export default taskService;