import React ,{useState} from 'react'
import CalendarPage from './CalendarPage';
import Sidebard from './Sidebard';
import Headerd from './Headerd';
export default function Scheduler() {
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
          <CalendarPage />
        </nav>
      </div>      
    )};