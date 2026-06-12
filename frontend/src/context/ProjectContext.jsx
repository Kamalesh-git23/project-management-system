import React,{createContext, useState, useEffect} from 'react';

export const ProjectContext = createContext();

function ProjectProvider({children}) {
    const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem("projects");
        return savedProjects ? JSON.parse(savedProjects) : [];
    });

    const [editingProject, setEditingProject] = useState(null);

    useEffect(()=> {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);



    const addProject = (project) => {
        setProjects(prev => [...prev,project]);
    };

    const updateProject = (id,updatedProject) => {
        setProjects(prev => 
            prev.map(project =>
                project.id === id ? updatedProject : project
            )
        );
    };

    const deleteProject = (id) => {
        setProjects(prev => 
            prev.filter(project => project.id !==id)
        );
    };


  return (
    <ProjectContext.Provider 
        value={{
            projects,
            addProject,
            updateProject,
            deleteProject,
            editingProject,
            setEditingProject}}>
        {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
