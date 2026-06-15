import {
  createContext,
  useState,
  useEffect,
} from "react";

import projectService from "../services/projectService";

export const ProjectContext =
  createContext();

export default function ProjectProvider({
  children,
}) {
  const [projects, setProjects] =
    useState([]);

  const fetchProjects =
    async () => {
      const res =
        await projectService.getProjects();

      setProjects(res.data);
    };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject =
    async (projectData) => {
      await projectService.createProject(
        projectData
      );

      fetchProjects();
    };

  const editProject =
    async (id, projectData) => {
      await projectService.updateProject(
        id,
        projectData
      );

      fetchProjects();
    };

  const removeProject =
    async (id) => {
      await projectService.deleteProject(
        id
      );

      fetchProjects();
    };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        fetchProjects,
        addProject,
        editProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}