import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from '../pages/ProjectsPage';
import CreateProjectPage from '../pages/CreateProjectPage';
import EditProjectPage from '../pages/EditProjectPage';
import KanbanPage from '../pages/KanbanPage';
import CreateTaskPage from '../pages/CreateTaskPage';
import EditTaskPage from '../pages/EditTaskPage';
import TasksPage from '../pages/TasksPage';



function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<ProjectsPage/>}/>
            <Route path='/projects/create' element={<CreateProjectPage/>}/>
            <Route path='/projects/edit/:projectId' element={<EditProjectPage/>}/>

            <Route path='/project/:projectId' element={<KanbanPage/>}/>
            <Route path='/tasks/create' element={<CreateTaskPage/>}/>
            <Route path='/tasks/edit/:taskId' element={<EditTaskPage/>}/>
            
            <Route path='/tasks' element={<TasksPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
