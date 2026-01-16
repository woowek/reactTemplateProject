import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { Home } from '@/pages/Home/Home'
import { CodeEditor } from '@/pages/CodeEditor/CodeEditor'
import { Terminal } from '@/pages/Terminal/Terminal'
import { FileManager } from '@/pages/FileManager/FileManager'
import { Statistics } from '@/pages/Statistics/Statistics'
import { Realtime } from '@/pages/Realtime/Realtime'
import { ROUTES } from '@/constants/routes'
import '@/styles/globals.css'
import '@/styles/variables.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path={ROUTES.CODE_EDITOR} element={<MainLayout><CodeEditor /></MainLayout>} />
        <Route path={ROUTES.TERMINAL} element={<MainLayout><Terminal /></MainLayout>} />
        <Route path={ROUTES.FILE_MANAGER} element={<MainLayout><FileManager /></MainLayout>} />
        <Route path={ROUTES.STATISTICS} element={<MainLayout><Statistics /></MainLayout>} />
        <Route path={ROUTES.REALTIME} element={<MainLayout><Realtime /></MainLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
