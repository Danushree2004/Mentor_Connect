import React ,{useState} from 'react'
import MentorSearch from './MentorSearch';
import Sidebard from './Sidebard';
import './Mentor.css'
export default function Mentor() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    return (
        <div className="bodym">
        <div className="dashboard flex h-screen">
        <nav className="flex flex-col w-64 flex-shrink-0">
          <Sidebard openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        </nav>
        <nav className="flex-grow overflow-y-auto">
          <MentorSearch />
        </nav>
      </div>     
      </div>
    )
}
