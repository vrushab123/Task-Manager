import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="user-menu">
                    <i className="bi bi-grid-3x3-gap"></i>
                    <span>Menu</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to="/" className="nav-item">
                            <i className="bi bi-inbox"></i>
                            <span>Inbox</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/today" className="nav-item active">
                            <i className="bi bi-calendar-day"></i>
                            <span>Today</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upcoming" className="nav-item">
                            <i className="bi bi-calendar4-week"></i>
                            <span>Upcoming</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
