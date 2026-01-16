/**
 * 코드 에디터 샘플 페이지
 */

import { useState } from 'react'
import Editor from '@monaco-editor/react'
import './CodeEditor.css'

export const CodeEditor = () => {
  const [code, setCode] = useState(`// JavaScript 코드를 작성해보세요`)
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vs-dark')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    alert('코드가 클립보드에 복사되었습니다!')
  }

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${language}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleRun = () => {
    if (language === 'javascript') {
      try {
        // eslint-disable-next-line no-eval
        eval(code)
        alert('코드가 실행되었습니다! (콘솔을 확인하세요)')
      } catch (error) {
        alert(`실행 오류: ${error}`)
      }
    } else {
      alert('JavaScript 코드만 실행할 수 있습니다.')
    }
  }

  return (
    <div className="code-editor-page">
      <div className="page-header">
        <h1>💻 코드 에디터</h1>
        <p>Monaco Editor를 활용한 프로페셔널 코드 편집기 (VS Code와 동일)</p>
      </div>

      <div className="editor-toolbar">
        <div className="toolbar-group">
          <label>언어:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>

        <div className="toolbar-group">
          <label>테마:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="vs-dark">Dark (VS Code)</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </div>

        <div className="toolbar-actions">
          <button className="btn-toolbar" onClick={handleRun}>▶️ 실행</button>
          <button className="btn-toolbar" onClick={handleSave}>💾 저장</button>
          <button className="btn-toolbar" onClick={handleCopy}>📋 복사</button>
        </div>
      </div>

      <div className="monaco-editor-container">
        <Editor
          height="500px"
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>

      <div className="editor-info">
        <span>언어: {language.toUpperCase()}</span>
        <span>라인: {code.split('\n').length}</span>
        <span>글자: {code.length}</span>
        <span>테마: {theme}</span>
      </div>

      <div className="editor-note">
        <h3>✅ 구현된 기능</h3>
        <ul>
          <li>Monaco Editor 통합 완료 (VS Code와 동일한 에디터)</li>
          <li>구문 하이라이팅 및 자동 완성</li>
          <li>JavaScript 코드 실행 기능</li>
          <li>파일 저장 및 클립보드 복사</li>
          <li>미니맵, 줄 번호, 자동 포맷팅</li>
        </ul>
        <h3>📌 향후 개선 사항</h3>
        <ul>
          <li>멀티탭 지원</li>
          <li>파일 불러오기</li>
          <li>코드 공유 기능</li>
          <li>실시간 협업 편집</li>
        </ul>
      </div>
    </div>
  )
}
