import React, { useState } from 'react';
import Headerd from './Headerd';
import Sidebard from './Sidebard';
import './Dashboard.css';
import MentorProfile from './MentorProfile';

export default function MoProfile() {
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
        <MentorProfile />
        </nav>
      </div>    
   
  )
}


