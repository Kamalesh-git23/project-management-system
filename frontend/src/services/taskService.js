import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskState,
  addNote,
  deleteNote
} from "../api/taskApi";

const taskService = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskState,
  addNote,
  deleteNote
};

export default taskService;