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

  useEffect(() => {
    if (!terminalRef.current) return

    // xterm.js 인스턴스 생성
    const term = new XTerm({
      cursorBlink: true,
      cursorStyle: 'block',
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
      rows: 24,
      cols: 80,
    })

    // 애드온 추가
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()

    term.loadAddon(fitAddon)
    term.loadAddon(webLinksAddon)

    // 터미널 열기
    term.open(terminalRef.current)
    fitAddon.fit()

    xtermRef.current = term
    fitAddonRef.current = fitAddon

    // WebSocket 연결
    const wsUrl = 'ws://localhost:8080'
    
    term.writeln('\x1b[1;36m🔌 터미널 서버에 연결 중...\x1b[0m')
    
    const socket = new WebSocket(wsUrl)
    socketRef.current = socket

    socket.onopen = () => {
      setIsConnected(true)
      setConnectionError(null)
      term.writeln('\x1b[1;32m✅ 연결 완료!\x1b[0m')
      term.writeln('\x1b[1;33m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\x1b[0m')
      term.writeln('')
    }

    socket.onerror = () => {
      setConnectionError('터미널 서버 연결 실패')
      term.writeln('\x1b[1;31m❌ 연결 실패!\x1b[0m')
      term.writeln('\x1b[1;33m터미널 서버가 실행 중인지 확인하세요:\x1b[0m')
      term.writeln('\x1b[0;37m  node terminalServer.js\x1b[0m')
      term.writeln('')
    }

    socket.onclose = () => {
      setIsConnected(false)
      term.writeln('')
      term.writeln('\x1b[1;31m🔌 서버 연결이 종료되었습니다.\x1b[0m')
    }

    // 서버에서 받은 데이터 → 터미널에 표시
    socket.onmessage = (event) => {
      term.write(event.data)
    }

    // 터미널 입력 → 서버로 전송
    term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data)
      }
    })

    // 창 크기 조정 시 터미널 크기 재조정
    const handleResize = () => {
      fitAddon.fit()
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: 'resize',
            cols: term.cols,
            rows: term.rows,
          })
        )
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      socket.close()
      term.dispose()
    }
  }, [])

  const handleReconnect = () => {
    window.location.reload()
  }

  return (
    <div className="terminal-page">
      <div className="page-header">
        <h1>⌨️ 실시간 터미널</h1>
        <p>WebSocket을 통해 실제 shell과 연결된 터미널</p>
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
          <li>✅ <strong>양방향 데이터 스트림</strong> (입력/출력)</li>
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
