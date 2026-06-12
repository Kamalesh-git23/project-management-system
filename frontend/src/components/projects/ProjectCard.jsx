import React, {useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import DeleteModal from '../common/DeleteModal';

import { ProjectContext } from '../../context/ProjectContext';

import { FaEdit,FaTrash } from 'react-icons/fa';

function ProjectCard({project}) {

    const [showDeleteModal,setShowDeleteModal] = useState(false);
    
    const navigate = useNavigate();

    const {deleteProject} = useContext(ProjectContext);

    const handleDeleteClick = (e) => {
        e.stopPropagation();

        setShowDeleteModal(true);
    };

    const handleConfirmDelete =() => {
        deleteProject(project.id);
        setShowDeleteModal(false);
    }

    return (
        <>
            <div className='project-card' onClick={()=> navigate(`/project/${project.id}`)}>
                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <p> <strong>Type:</strong> {project.type} </p>

                <p> <strong>Priority:</strong> {project.priority} </p>

                <p> <strong>Status:</strong> {project.status} </p>

                <p> <strong>Start Date:</strong>{" "}
                    {new Date(project.startDate).toLocaleDateString("en-GB")} 
                </p>

                <p> <strong>End Date:</strong>{" "}
                    {new Date(project.endDate).toLocaleDateString("en-GB")} 
                </p>

                <p> <strong>Team:</strong> {project.teamMembers} </p>

                <div className='card-actions'>

                    <button className="icon-btn edit-btn"
                            onClick={(e)=> {
                                e.stopPropagation();
                                navigate(`/projects/edit/${project.id}`);
                            }}
                            title="Edit Project"> 
                        <FaEdit/>
                    </button>

                    <button className="icon-btn delete-btn"
                            onClick={handleDeleteClick}
                            title="Delete Project"> 
                        <FaTrash/>
                    </button>
                </div>
            </div>
            <DeleteModal
                isOpen={showDeleteModal}
                title="Delete Project"
                message={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteModal(false)}/>
        </>

  );
}

export default ProjectCard;
