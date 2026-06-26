import React from "react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaProjectDiagram,
  FaTasks,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
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
    <aside className="sidebar">

      <div className="sidebar-menu">

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : ""
          }
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : ""
          }
        >
          <FaTasks />
          <span>Tasks</span>
        </NavLink>

      </div>

      <div className="sidebar-footer">

        <div
          className="sidebar-profile"
          onClick={() =>
            navigate("/profile")
          }
        >
          {user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="sidebar-avatar"
            />
          ) : (
            <FaUserCircle
              className="sidebar-profile-icon"
            />
          )}

          <div className="sidebar-profile-info">
            <h4>
              {user?.firstName}{" "}
              {user?.lastName}
            </h4>

            <p>
              {user?.email}
            </p>
          </div>
        </div>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;