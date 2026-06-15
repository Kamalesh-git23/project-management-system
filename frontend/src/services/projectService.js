import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

const projectService = {
  getProjects: async () => {
    return await getProjects();
  },

  getProjectById: async (id) => {
    return await getProjectById(id);
  },

  createProject: async (data) => {
    return await createProject(data);
  },

  updateProject: async (id, data) => {
    return await updateProject(id, data);
  },

  deleteProject: async (id) => {
    return await deleteProject(id);
  },
};

export default projectService;