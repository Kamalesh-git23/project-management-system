import React, { useState, useContext, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom';

import Layout from '../components/common/Layout';
import TaskForm from '../components/tasks/TaskForm';

import { TaskContext } from '../context/TaskContext'

import { FaArrowLeft, FaSave, FaStickyNote, FaTrash } from 'react-icons/fa';

function EditTaskPage() {
  const {taskId} = useParams();

  const navigate = useNavigate();
  
  const {tasks,updateTask} = useContext(TaskContext);

  const task = tasks.find(task => task.id === Number(taskId));
  
  const [note,setNote] = useState("");

  const [editedTask,setEditedTask] = useState({
      title:"",
      description:"",
      type:"",
      priority:"",
      state:"",
      dueDate:"",
      dueTime:"",
      notes:[],
      attachments:[]
  });

  useEffect(() => {
    if(task){
      setEditedTask(task);
    }
  }, [task]);

  if(!task){
    return (
      <Layout pageTitle="Task Details">
        <div style={{padding:"20px"}}>
          <h2>Task Not Found</h2>
        </div>
      </Layout>
    );
  }


  const addNote = () =>{
    if(!note.trim()) return;

    setEditedTask(prev => ({
      ...prev,
      notes: [...(prev.notes || []),note]
    }));

    setNote("");
  };

  const removeNote = (index) =>{

    setEditedTask(prev => ({
      ...prev,
      notes: prev.notes.filter((_,i) => i !== index)
    }));

  };

  const removeAttachment = (index) => {
    setEditedTask((prev) => ({
      ...prev,
      attachments:
        prev.attachments.filter((_,i) => i !== index),
    }));
  };

  const isFormValid = 
    editedTask.title.trim() &&
    editedTask.description.trim() &&
    editedTask.type.trim() &&
    editedTask.priority &&
    editedTask.state &&
    editedTask.dueDate &&
    editedTask.dueTime;

  const handleSaveChanges = () => {
    if(!isFormValid) return;

    updateTask(task.id, {...editedTask, id: task.id, projectId:task.projectId});

    navigate(`/project/${task.projectId}`);
  };
  
  return (
    <Layout
      pageTitle="Task Details"
      actionButton={
        <button disabled={!isFormValid} onClick={handleSaveChanges}>
          <FaSave/>
          Save Changes
        </button>
      }>

      

      <div className="task-details" >

        <TaskForm formData={editedTask} setFormData={setEditedTask}/>

        <div className="form-section">
          <h3>Notes</h3>

          <div className="note-input">

            <input type="text" placeholder='Add Note' value={note} onChange={(e) => setNote(e.target.value)}/>

            <button type="button" onClick={addNote}>
              <FaStickyNote/>
              Add Note
            </button>
          </div>

          <ul>
            {
              (editedTask.notes || []).map(
                (note,index) => (
                  <li key={index}> 
                    {note}

                    <button type="button" 
                            className="icon-btn delete-btn"
                            onClick={() => removeNote(index)}
                            title="Remove Note">
                      <FaTrash/>
                    </button> 
                  </li>
                ))}
          </ul>

        </div>


        <div className="form-section">

          <h3>Attached Files</h3>

          {(editedTask.attachments || []).length === 0 ? (

            <p>No attachments available.</p>

          ) : (

            <ul>

              {(editedTask.attachments || []).map(
                (file, index) => (

                  <li key={index}>

                    <span>
                      {file.name}

                      {file.size && (
                        <>
                          {" "}
                          (
                          {(file.size / 1024).toFixed(2)}
                          KB)
                        </>
                      )}
                    </span>

                    <button
                      type="button"
                      className="icon-btn delete-btn"
                      onClick={() =>
                        removeAttachment(index)
                      }
                      title="Remove Attachment"
                    >
                      <FaTrash />
                    </button>

                  </li>

                )
              )}

            </ul>

          )}

        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate(`/project/${task.projectId}`)}>

            <FaArrowLeft/>
            Back to Board
          </button>

          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleSaveChanges}>

            <FaSave/>
            Save Changes
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default EditTaskPage;