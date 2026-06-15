import React from "react";

import { NavLink } from "react-router-dom";

import {
  FaProjectDiagram,
  FaTasks,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive
            ? "active-link"
            : ""
        }
      >
        <FaProjectDiagram />
        <span>
          Projects
        </span>
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
        <span>
          Tasks
        </span>
      </NavLink>
    </aside>
  );
}

export default Sidebar;