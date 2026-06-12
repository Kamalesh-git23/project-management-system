import React from 'react'
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaProjectDiagram, FaTasks, FaPlus } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className='sidebar'>

      {/* <NavLink to="/dashboard">
        <MdDashboard/>
        Dashboard
      </NavLink> */}

      <NavLink to="/">
        <FaProjectDiagram/>
        Projects
      </NavLink>
      

      <NavLink to="/tasks">
        <FaTasks/>
        Tasks
      </NavLink>
            
    </aside>
  );
}

export default Sidebar;
