import React from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({
  children,
  pageTitle,
  actionButton,
}) {
  return (
    <div className="app-layout">
      <Navbar
        pageTitle={pageTitle}
        actionButton={actionButton}
      />

      <div className="layout">
        <Sidebar />

        <main className="content" style={{marginTop:"70px"}}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;