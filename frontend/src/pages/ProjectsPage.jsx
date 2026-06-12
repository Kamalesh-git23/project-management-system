import React, {useContext} from 'react';

import Layout from '../components/common/Layout';

import ProjectCard from '../components/projects/ProjectCard';

import { ProjectContext } from '../context/ProjectContext';

import { useNavigate } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';

function ProjectsPage() {

    const {projects} = useContext(ProjectContext);

    const navigate = useNavigate();
    
    return (

        <Layout pageTitle="Projects Overview" 
                actionButton={
                    <button onClick={() => navigate("/projects/create")}>
                        <FaPlus/>
                        New Project
                    </button>
                }>


            <div className='projects-grid'>

                {projects.length > 0 ? (
                    projects.map(project => (
                    <ProjectCard key={project.id}  project={project}/>
                ))
                ):(
                    <div className="empty-state">
                        <h2>No Projects Found</h2>

                        <p>Create your first project.</p>
                    </div>
                )}

                
            </div>
                
        </Layout>
                
  );
}

export default ProjectsPage;