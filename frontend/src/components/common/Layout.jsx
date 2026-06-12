import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Layout({children, pageTitle,actionButton}) {
  return (
    <div style={{width:"100vw",height:"100vh"}}>
        <Navbar pageTitle={pageTitle} actionButton={actionButton}/>

        <div className="layout">
            <Sidebar/>

            <main className="content">
                {children}
            </main>
        </div>
    </div>
  );
}

export default Layout;