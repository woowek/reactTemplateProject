/**
 * 메인 레이아웃 컴포넌트
 * Header, Sidebar, Content, Footer로 구성
 */

import { useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
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
      <Header onToggleSidebar={toggleSidebar} />
      <div className="main-container">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
