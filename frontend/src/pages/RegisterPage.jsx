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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      description: "",
      image: null,
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageChange =
    (e) => {
      setFormData({
        ...formData,
        image:
          e.target.files[0],
      });
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        formData.password !==
        formData.confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        setLoading(true);

        const payload =
          new FormData();

        payload.append(
          "firstName",
          formData.firstName
        );

        payload.append(
          "lastName",
          formData.lastName
        );

        payload.append(
          "email",
          formData.email
        );

        payload.append(
          "password",
          formData.password
        );

        payload.append(
          "description",
          formData.description
        );

        if (
          formData.image
        ) {
          payload.append(
            "image",
            formData.image
          );
        }

        await register(
          payload
        );

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
        onSubmit={
          handleSubmit
        }
      >
        <h2>
          Create Account
        </h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={
            formData.firstName
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={
            formData.lastName
          }
          onChange={
            handleChange
          }
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          required
        />

        <textarea
          name="description"
          placeholder="About Yourself"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          rows="3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={
            handleImageChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          minLength={6}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={
            formData.confirmPassword
          }
          onChange={
            handleChange
          }
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
          Already have an
          account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>

    </div>
  );
}

export default RegisterPage;