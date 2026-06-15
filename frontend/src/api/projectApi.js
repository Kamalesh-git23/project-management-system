import api from "./axios";

export const getProjects =
  async () => {
    return await api.get(
      "/projects"
    );
  };

export const getProjectById =
  async (id) => {
    return await api.get(
      `/projects/${id}`
    );
  };

export const createProject =
  async (data) => {
    return await api.post(
      "/projects",
      data
    );
  };

export const updateProject =
  async (id, data) => {
    return await api.put(
      `/projects/${id}`,
      data
    );
  };

export const deleteProject =
  async (id) => {
    return await api.delete(
      `/projects/${id}`
    );
  };