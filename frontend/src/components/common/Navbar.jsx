import React from "react";

import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

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

        <div className="user-info">
          <span>
            {user?.name}
          </span>

          <button
            className="logout-btn"
            onClick={
              handleLogout
            }
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;