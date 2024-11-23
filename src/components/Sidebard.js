import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import {Link} from 'react-router-dom'

function Sidebard({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
            <Link to="/home">

                <BsCart3  className='icon_header'/> Website
</Link>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
    <a href="/dashboard">
        <BsGrid1X2Fill className='icon'/> Dashboard
    </a>
</li>
<li className='sidebar-list-item'>
    <a href="/scheduler">
        <BsFillArchiveFill className='icon'/> Scheduler
    </a>
</li>
<li className='sidebar-list-item'>
    <a href="/room">
        <BsFillGrid3X3GapFill className='icon'/> Live interactions
    </a>
</li>
<li className='sidebar-list-item'>
    <a href="/settings">
        <BsPeopleFill className='icon'/> Settings
    </a>
</li>
           
        </ul>
    </aside>
  )
}

export default Sidebard;