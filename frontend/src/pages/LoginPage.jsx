import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({
            ...formData,
            password: e.target.value,
          })
        }
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginPage;