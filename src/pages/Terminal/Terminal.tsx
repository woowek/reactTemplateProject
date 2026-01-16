/**
 * xterm.js 기반 실시간 터미널 페이지
 * WebSocket을 통해 실제 shell과 연결됩니다.
 */

import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'
import './Terminal.css'

export const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const xtermRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [mode, setMode] = useState<'local' | 'container'>('local')
  const [containerName, setContainerName] = useState('')

  useEffect(() => {
    if (!terminalRef.current) return
    
    let cleanup: (() => void) | undefined

    // xterm.js 터미널 생성
    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
      },
      scrollback: 1000,
      convertEol: true,
    })

    // 애드온 추가
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.loadAddon(new WebLinksAddon())

    // 터미널 열기
    term.open(terminalRef.current)
    xtermRef.current = term
    fitAddonRef.current = fitAddon
    
    // 크기 자동 조정
    const initTimer = setTimeout(() => {
      fitAddon.fit()
      
      // WebSocket 연결
      const socket = new WebSocket('ws://localhost:8080')
      socketRef.current = socket

      socket.onopen = () => {
        setIsConnected(true)
        setConnectionError(null)
        
        // 초기화 메시지 전송 (모드 선택)
        socket.send(JSON.stringify({ 
          type: 'init',
          mode: mode,
          containerName: mode === 'container' ? containerName : '',
          cols: term.cols,
          rows: term.rows
        }))
      }

      // 데이터 수신 → 화면 출력
      socket.onmessage = (event) => {
        term.write(event.data)
      }

      socket.onerror = () => {
        setConnectionError('서버 연결 실패')
        term.writeln('\x1b[31m❌ 연결 실패\x1b[0m')
        term.writeln('터미널 서버를 실행하세요: node terminalServer.js\n')
      }

      socket.onclose = () => {
        setIsConnected(false)
        term.writeln('\n\x1b[31m🔌 서버 연결 종료\x1b[0m')
      }

      // 키보드 입력 → 서버 전송
      term.onData((data) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(data)
        }
      })

      // 창 크기 변경 처리
      const handleResize = () => {
        fitAddon.fit()
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }))
        }
      }
      window.addEventListener('resize', handleResize)

      cleanup = () => {
        window.removeEventListener('resize', handleResize)
        socket.close()
        term.dispose()
      }
    }, 100)

    return () => {
      clearTimeout(initTimer)
      if (cleanup) {
        cleanup()
      } else {
        term.dispose()
      }
    }
  }, [mode, containerName])

  const handleReconnect = () => {
    window.location.reload()
  }

  return (
    <div className="terminal-page">
      <div className="page-header">
        <h1>⌨️ 실시간 터미널</h1>
        <p>WebSocket을 통해 실제 shell과 연결된 터미널</p>
      </div>

      <div className="terminal-controls">
        <div className="control-group">
          <label>
            <input 
              type="radio" 
              value="local" 
              checked={mode === 'local'}
              onChange={(e) => setMode(e.target.value as 'local')}
              disabled={isConnected}
            />
            🖥️ 로컬 터미널
          </label>
          <label>
            <input 
              type="radio" 
              value="container" 
              checked={mode === 'container'}
              onChange={(e) => setMode(e.target.value as 'container')}
              disabled={isConnected}
            />
            🐳 Docker 컨테이너
          </label>
        </div>
        {mode === 'container' && (
          <div className="container-input">
            <input
              type="text"
              placeholder="컨테이너 이름 또는 ID"
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
              disabled={isConnected}
            />
          </div>
        )}
      </div>

      <div className="terminal-status">
        {isConnected ? (
          <div className="status-indicator connected">
            <span className="status-dot"></span>
            <span>서버 연결됨</span>
          </div>
        ) : connectionError ? (
          <div className="status-indicator error">
            <span className="status-dot"></span>
            <span>{connectionError}</span>
            <button onClick={handleReconnect} className="reconnect-btn">
              🔄 재연결
            </button>
          </div>
        ) : (
          <div className="status-indicator connecting">
            <span className="status-dot"></span>
            <span>연결 중...</span>
          </div>
        )}
      </div>

      <div className="xterm-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn-close"></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
          <div className="terminal-title">xterm.js@websocket:~</div>
        </div>
        <div ref={terminalRef} className="xterm-terminal" />
      </div>

      <div className="terminal-note">
        <h3>🚀 실시간 터미널</h3>
        <ul>
          <li>✅ <strong>실제 shell 명령어 실행</strong> (PowerShell/Bash)</li>
          <li>✅ <strong>WebSocket 실시간 통신</strong></li>
          <li>✅ <strong>Docker 컨테이너 지원</strong> 🐳</li>
          <li>✅ <strong>ANSI 색상 완벽 지원</strong></li>
        </ul>
        <h3>⚙️ 서버 실행 방법</h3>
        <div className="code-block">
          <code>node terminalServer.js</code>
        </div>
        <p className="note-text">
          터미널 서버가 포트 8080에서 실행되어야 합니다.
        </p>
      </div>
    </div>
  )
}
