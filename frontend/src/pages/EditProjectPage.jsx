import React, {useContext,useEffect,useState} from 'react'

import { useNavigate,useParams } from 'react-router-dom';

import Layout from '../components/common/Layout';
import ProjectForm from '../components/projects/ProjectForm';

import { ProjectContext } from '../context/ProjectContext';

import { FaSave } from 'react-icons/fa';

function EditProjectPage() {
    const {projectId} = useParams();

    const navigate = useNavigate();

    const {projects, updateProject} = useContext(ProjectContext);

    const project = projects.find(
        project =>
            project.id === Number(projectId)
    );

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

    useEffect(() => {
        if(project){
            setFormData(project);
        }

    }, [project]);

    if(!project){
        return (
            <Layout pageTitle="Project Settings">
                <h2>Project Not Found</h2>
            </Layout>
        );
    }

    const isFormValid = 
        formData.name.trim() &&
        formData.description.trim() && 
        formData.type.trim() &&
        formData.startDate &&
        formData.endDate &&
        formData.priority &&
        formData.teamMembers.trim() &&
        formData.status;

    const handleSaveChanges = () => {
        if (!isFormValid) return;

        updateProject(
            project.id,
            {
                ...formData,
                id:project.id
            }
        );

        navigate("/");
    };
    

  return (
    <Layout
        pageTitle="Project Settings"
        actionButton={
            <button disabled={!isFormValid} onClick={handleSaveChanges}>
                <FaSave/>
                Save Changes
            </button>
        }>

        <ProjectForm formData={formData} setFormData={setFormData}/>

        <div className='form-actions'>
            <button
                type="button"
                className='cancel-btn'
                onClick={()=> navigate("/")}>
                Cancel
            </button>

            <button 
                type="button"
                disabled={!isFormValid} 
                onClick={handleSaveChanges}>
                <FaSave/>
                Save Changes
            </button>
        </div>
      
    </Layout>
  );
}

export default EditProjectPage;
