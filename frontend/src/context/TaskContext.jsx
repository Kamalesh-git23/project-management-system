import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

function TaskProvider({children}) {

    const [tasks,setTasks] = useState(()=>{
      const savedTasks = localStorage.getItem("tasks");

      return savedTasks ? JSON.parse(savedTasks):[];
    });

    useEffect(() => {
      localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks]);


    const addTask = (task) => {
        setTasks(prev => [...prev,task]);
    };

    const deleteTask = (id) =>{
      setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateTask = (id,updatedTask) => {
      setTasks(prev =>  prev.map(task => task.id === id ? updatedTask:task));
    };

    const moveTask = (taskId, newState) => {
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? {...task, state:newState} : task
        )
      );
    };

  return (
    <TaskContext.Provider
        value={{
          tasks,
          addTask,
          deleteTask,
          updateTask,
          moveTask}}>
        {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;