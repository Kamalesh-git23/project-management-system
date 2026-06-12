import React, { useContext } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

import Layout from '../components/common/Layout';
import KanbanColumn from '../components/tasks/KanbanColumn';

import { TaskContext } from '../context/TaskContext';
import { ProjectContext } from '../context/ProjectContext';

import { DragDropContext } from '@hello-pangea/dnd';

import { FaPlus } from "react-icons/fa";


function KanbanPage() {
  const {projectId} = useParams();

  const navigate = useNavigate();

  const {tasks,moveTask} = useContext(TaskContext);

  const {projects} = useContext(ProjectContext);

  const project = projects.find(project => project.id === Number(projectId));

  const projectTasks = tasks.filter(task => task.projectId === Number(projectId));

  const handleDragEnd = (result) => {

    if( !result.destination)
      return;

    const taskId = Number(result.draggableId);

    const newState = result.destination.droppableId;

    moveTask(taskId,newState);
  };

  return (
    <Layout 
      pageTitle={project ? `${project.name} Board` : "Project Board" }
      actionButton={
        <button
          onClick={() => navigate(`/tasks/create?projectId=${projectId}`)}>
            <FaPlus/>
            New Task
          </button>
      }>

      

    
      <div className='kanban-page'>
      
        <DragDropContext onDragEnd={handleDragEnd}>

          <div className='kanban-board'>
            <KanbanColumn
              title="Todo"
              tasks={projectTasks.filter(task => task.state === "Todo")}/>

            <KanbanColumn
              title="In Progress"
              tasks={projectTasks.filter(task => task.state === "In Progress")}/>
            
            <KanbanColumn
              title="Waiting"
              tasks={projectTasks.filter(task => task.state === "Waiting")}/>

            <KanbanColumn
              title="Done"
              tasks={projectTasks.filter(task => task.state === "Done")}/>

          </div>
        </DragDropContext>
      
      </div>
    </Layout>
  );
}

export default KanbanPage;
