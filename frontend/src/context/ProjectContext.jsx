import {
  createContext,
  useState,
  useEffect,
} from "react";

import projectService from "../services/projectService";
import { useAuth } from "../hooks/useAuth";

export const ProjectContext =
  createContext();

export default function ProjectProvider({
  children,
}) {
  const { user } = useAuth();

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  const fetchProjects =
    async () => {
      try {
        setLoading(true);

        const res =
          await projectService.getProjects();

        setProjects(res.data);

        setError(null);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to fetch projects"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const addProject =
    async (projectData) => {
      const res =
        await projectService.createProject(
          projectData
        );

      setProjects((prev) => [
        res.data,
        ...prev,
      ]);

      return res.data;
    };

  const editProject =
    async (id, projectData) => {
      const res =
        await projectService.updateProject(
          id,
          projectData
        );

      setProjects((prev) =>
        prev.map((project) =>
          project.id === id
            ? res.data
            : project
        )
      );

      return res.data;
    };

  const removeProject =
    async (id) => {
      await projectService.deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project.id !== id
        )
      );
    };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
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