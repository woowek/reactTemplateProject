/**
 * Sidebar 컴포넌트
 */

import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '@/constants/navigation'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside className={`main-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.href}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
