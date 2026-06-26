import {
  createContext,
  useState,
  useEffect,
} from "react";

import authService from "../services/authService";

export const AuthContext =
  createContext();

export default function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          setLoading(false);
          return;
        }

        const res =
          await authService.getProfile();

        setUser(res.data);

        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);

        localStorage.removeItem(
          "token"
        );

        setUser(null);

        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

  const login =
    async (data) => {
      const res =
        await authService.login(
          data
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      await loadUser();

      return res.data;
    };

  const register =
    async (data) => {
      const res =
        await authService.register(
          data
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      await loadUser();

      return res.data;
    };

  const logout = () => {
    authService.logout();

    localStorage.removeItem(
      "token"
    );

    setUser(null);

    setIsAuthenticated(false);
  };

  const updateProfile = async (data) => {
    const res =
      await authService.updateProfile(data);

    setUser(res.data.user);

    return res.data;
  };

  const changePassword = async (data) => {
    const res =
      await authService.changePassword(data);

    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        loadUser,
        updateProfile,
        changePassword,
      }}
      >
      {children}
    </AuthContext.Provider>
  );
}