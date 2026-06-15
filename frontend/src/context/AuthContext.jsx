import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/authApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile();

        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    setUser(res.data.user);

    return res.data;
  };

  const register = async (data) => {
    const res = await registerUser(data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    setUser(res.data.user);

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}