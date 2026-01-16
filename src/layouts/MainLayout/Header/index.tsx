/**
 * Header 컴포넌트
 */

import './Header.css'

interface HeaderProps {
  onToggleSidebar: () => void
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <header className="main-header">
      <div className="header-content">
        <button 
          className="menu-toggle-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="hamburger-icon">☰</span>
        </button>
        <h1 className="app-title">{import.meta.env.VITE_APP_TITLE}</h1>
        <div className="header-actions">
          <button className="header-btn" aria-label="Notifications">🔔</button>
          <button className="header-btn" aria-label="User menu">👤</button>
        </div>
      </div>
    </header>
  )
}
