import api from "./axios";

export const registerUser = async (
  data
) => {
  return await api.post(
    "/auth/register",
    data
  );
};

export const loginUser = async (
  data
) => {
  return await api.post(
    "/auth/login",
    data
  );
};

export const getProfile =
  async () => {
    return await api.get(
      "/auth/profile"
    );
  };

export const logoutUser =
  async () => {
    return Promise.resolve();
  };