import React from 'react'
import { FaProjectDiagram } from 'react-icons/fa';

function Navbar({pageTitle, actionButton}) {
  return (
    <nav className='navbar'>

      <div className='navbar-left'>
        <h1>{pageTitle}</h1>
      </div>

      <div className='navbar-right'>
        <h1>{actionButton}</h1>
      </div>
        
    </nav>
  );
}

export default Navbar;
