import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Password reset link will be sent to ${email}`
    );
  };

  return (
    <div className="login-container">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button type="submit">
          Send Reset Link
        </button>

        <p>
          Remember your password?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;