/**
 * 메인 레이아웃 컴포넌트
 * Header, Sidebar, Content, Footer로 구성
 */

import { useState, type ReactNode } from 'react'
import './MainLayout.css'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="main-layout">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <button 
            className="menu-toggle-btn" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span className="hamburger-icon">☰</span>
          </button>
          <h1 className="app-title">{import.meta.env.VITE_APP_TITLE}</h1>
          <div className="header-actions">
            <button className="header-btn">🔔</button>
            <button className="header-btn">👤</button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className={`main-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <ul className="nav-menu">
              <li className="nav-item active">
                <a href="#dashboard" className="nav-link">
                  <span className="nav-icon">🏠</span>
                  <span className="nav-text">대시보드</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#users" className="nav-link">
                  <span className="nav-icon">👥</span>
                  <span className="nav-text">사용자</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#products" className="nav-link">
                  <span className="nav-icon">📦</span>
                  <span className="nav-text">상품</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#orders" className="nav-link">
                  <span className="nav-icon">🛒</span>
                  <span className="nav-text">주문</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#analytics" className="nav-link">
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">분석</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#settings" className="nav-link">
                  <span className="nav-icon">⚙️</span>
                  <span className="nav-text">설정</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2026 {import.meta.env.VITE_APP_TITLE}. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#terms" className="footer-link">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
