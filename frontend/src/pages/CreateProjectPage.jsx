import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/common/Layout';
import ProjectForm from '../components/projects/ProjectForm';

import { ProjectContext } from '../context/ProjectContext';

import { FaSave } from 'react-icons/fa';

function CreateProjectPage() {

    const navigate = useNavigate();

    const {addProject} = useContext(ProjectContext);

    const [formData, setFormData] = useState({
        name:"",
        description:"",
        type:"",
        startDate:"",
        endDate:"",
        priority:"",
        teamMembers:"",
        status:"",
    });

    const isFormValid = 
        formData.name.trim() &&
        formData.description.trim() && 
        formData.type.trim() &&
        formData.startDate &&
        formData.endDate &&
        formData.priority &&
        formData.teamMembers.trim() &&
        formData.status;

    const handleCreateProject =() =>{
        if(!isFormValid) return;

        addProject({
            id:Date.now(),
            ...formData
        });

        navigate("/");
    };


  return (
    <Layout pageTitle="New Project"
            actionButton={
                <button disabled={!isFormValid} onClick={handleCreateProject} >
                    <FaSave/>
                    Save Project
                </button>
            }>

        <ProjectForm
            formData={formData}
            setFormData={setFormData}/>

        <div className='form-actions'>
            <button type='button' 
                    className='cancel-btn' 
                    onClick={() => navigate("/")}>
                cancel
            </button>

            <button type='button' 
                    disabled={!isFormValid} 
                    onClick={handleCreateProject} >
                <FaSave/>
                Save project
            </button>
        </div>

    </Layout>
  );
}

export default CreateProjectPage;

