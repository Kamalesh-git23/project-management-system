import React from "react";

function Navbar({
  pageTitle,
  actionButton,
}) {


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>{pageTitle}</h1>
      </div>

      <div className="navbar-right">
        {actionButton}
      </div>
    </nav>
  );
}

export default Navbar;