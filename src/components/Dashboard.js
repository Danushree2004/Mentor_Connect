import React, { useState } from 'react';
import Sidebard from './Sidebard';
import Homed from './Homed';
import './Dashboard.css';

function Dashboard() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className="dashboard flex h-screen">
        <nav className="flex flex-col w-64 flex-shrink-0">
          <Sidebard openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        </nav>
        <nav className="flex-grow overflow-y-auto">
          <Homed />
        </nav>
      </div>     
    );
}

export default Dashboard;
