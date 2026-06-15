import React from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar({
  pageTitle,
  actionButton,
}) {
  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const handleLogout =
    () => {
      logout();
      navigate("/login");
    };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>{pageTitle}</h1>
      </div>

      <div className="navbar-right">
        {actionButton}

        <div className="profile-card">
          <FaUserCircle className="profile-icon" />

          <div className="profile-info">
            <span className="profile-name">
              {user?.name}
            </span>

            <span className="profile-email">
              {user?.email}
            </span>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;