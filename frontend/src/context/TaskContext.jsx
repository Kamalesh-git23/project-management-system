import {
  createContext,
  useEffect,
  useState,
} from "react";

import taskService from "../services/taskService";

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

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}