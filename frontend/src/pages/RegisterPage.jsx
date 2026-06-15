import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function RegisterPage() {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await register(formData);

        navigate(
          "/projects"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="register-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          minLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;