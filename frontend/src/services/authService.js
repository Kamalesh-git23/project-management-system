import {
  loginUser,
  registerUser,
  getProfile,
} from "../api/authApi";

const authService = {
  login: loginUser,

  register: registerUser,

  getProfile,

  logout: () => {
    localStorage.removeItem(
      "token"
    );
  },
};

export default authService;