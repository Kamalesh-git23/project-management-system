import {
  createContext,
  useEffect,
  useState,
} from "react";

import taskService from "../services/taskService";
import attachmentService from "../services/attachmentService";

export const TaskContext =
  createContext();

export default function TaskProvider({
  children,
}) {
  const [tasks, setTasks] =
    useState([]);

  const fetchTasks =
    async () => {
      const res =
        await taskService.getTasks();

      setTasks(res.data);
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask =
    async (taskData) => {
      await taskService.createTask(
        taskData
      );

      fetchTasks();
    };

  const editTask =
    async (id, taskData) => {
      await taskService.updateTask(
        id,
        taskData
      );

      fetchTasks();
    };

  const removeTask =
    async (id) => {
      await taskService.deleteTask(id);

      fetchTasks();
    };

  const moveTask =
    async (id, state) => {
      await taskService.updateTaskState(
        id,
        state
      );

      fetchTasks();
    };

  const uploadTaskAttachment = async (
  taskId,
  file
) => {

  const formData = new FormData();

  formData.append("file", file);

  await attachmentService.uploadAttachment(
    taskId,
    formData
  );

  fetchTasks();
};

const removeAttachment = async (
  attachmentId
) => {

  await attachmentService.deleteAttachment(
    attachmentId
  );

  fetchTasks();
};

const createNote = async (
  taskId,
  content
) => {

  await taskService.addNote(
    taskId,
    content
  );

  fetchTasks();
};

const removeNote = async (
  taskId,
  noteId
) => {

  await taskService.deleteNote(
    taskId,
    noteId
  );

  fetchTasks();
};

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        moveTask,
        uploadTaskAttachment,
        removeAttachment,
        createNote,
        removeNote
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}