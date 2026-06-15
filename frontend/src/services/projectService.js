import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

const projectService = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

export default projectService;