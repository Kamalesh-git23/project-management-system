import {
  createContext,
  useEffect,
  useState,
} from "react";

import taskService from "../services/taskService";
import attachmentService from "../services/attachmentService";
import { useAuth } from "../hooks/useAuth";

export const TaskContext =
  createContext();

export default function TaskProvider({
  children,
}) {
  const { user } = useAuth();

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchTasks =
    async () => {
      try {
        setLoading(true);

        const res =
          await taskService.getTasks();

        setTasks(res.data);

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to fetch tasks"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const addTask =
    async (taskData) => {
      const res =
        await taskService.createTask(
          taskData
        );

      setTasks((prev) => [
        res.data,
        ...prev,
      ]);

      return res.data;
    };

  const editTask =
    async (id, taskData) => {
      const res =
        await taskService.updateTask(
          id,
          taskData
        );

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? res.data
            : task
        )
      );

      return res.data;
    };

  const removeTask =
    async (id) => {
      await taskService.deleteTask(id);

      setTasks((prev) =>
        prev.filter(
          (task) => task.id !== id
        )
      );
    };

  const moveTask =
    async (id, state) => {
      const res =
        await taskService.updateTaskState(
          id,
          state
        );

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? res.data
            : task
        )
      );
    };

  const uploadTaskAttachment =
    async (taskId, file) => {
      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      await attachmentService.uploadAttachment(
        taskId,
        formData
      );

      await fetchTasks();
    };

  const removeAttachment =
    async (attachmentId) => {
      await attachmentService.deleteAttachment(
        attachmentId
      );

      await fetchTasks();
    };

  const createNote =
    async (
      taskId,
      content
    ) => {
      await taskService.addNote(
        taskId,
        content
      );

      await fetchTasks();
    };

  const removeNote =
    async (
      taskId,
      noteId
    ) => {
      await taskService.deleteNote(
        taskId,
        noteId
      );

      await fetchTasks();
    };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        moveTask,
        uploadTaskAttachment,
        removeAttachment,
        createNote,
        removeNote,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}