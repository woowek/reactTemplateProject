/**
 * 실시간 데이터 페이지
 */

import { useState, useEffect } from 'react'
import './Realtime.css'

interface LogEntry {
  id: number
  timestamp: string
  type: 'info' | 'warning' | 'error' | 'success'
  message: string
}

interface RealtimeData {
  cpu: number
  memory: number
  requests: number
  activeUsers: number
}

export const Realtime = () => {
  const [data, setData] = useState<RealtimeData>({
    cpu: 45,
    memory: 62,
    requests: 1250,
    activeUsers: 328,
  })

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: new Date().toLocaleTimeString(), type: 'info', message: '시스템 시작됨' },
    { id: 2, timestamp: new Date().toLocaleTimeString(), type: 'success', message: '데이터베이스 연결 성공' },
  ])

  const [isConnected, setIsConnected] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (!isConnected) return

    // 실시간 데이터 업데이트 시뮬레이션
    const dataInterval = setInterval(() => {
      setData({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        requests: Math.floor(Math.random() * 2000),
        activeUsers: Math.floor(Math.random() * 500),
      })
    }, 2000)

    // 로그 추가 시뮬레이션
    const logInterval = setInterval(() => {
      const types: LogEntry['type'][] = ['info', 'warning', 'error', 'success']
      const messages = [
        'API 요청 처리 완료',
        '새 사용자 연결',
        '캐시 갱신',
        '데이터베이스 쿼리 실행',
        '파일 업로드 완료',
        '세션 만료',
      ]

      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
      }

      setLogs((prev) => [...prev.slice(-49), newLog]) // 최대 50개 유지
    }, 3000)

    return () => {
      clearInterval(dataInterval)
      clearInterval(logInterval)
    }
  }, [isConnected])

  const toggleConnection = () => {
    setIsConnected(!isConnected)
    if (!isConnected) {
      setLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          type: 'success',
          message: '실시간 모니터링 시작',
        },
      ])
    } else {
      setLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          type: 'warning',
          message: '실시간 모니터링 중지',
        },
      ])
    }
  }

  const clearLogs = () => {
    setLogs([])
  }

  const getStatusColor = (value: number) => {
    if (value < 50) return '#10b981'
    if (value < 80) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="realtime-page">
      <div className="page-header">
        <div>
          <h1>⚡ 실시간 데이터</h1>
          <p>실시간 모니터링 및 로그 스트리밍 샘플</p>
        </div>
        <div className="header-actions">
          <div className="connection-status">
            <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
            {isConnected ? '연결됨' : '연결 끊김'}
          </div>
          <button className={`btn-connect ${isConnected ? 'active' : ''}`} onClick={toggleConnection}>
            {isConnected ? '⏸️ 중지' : '▶️ 시작'}
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">CPU 사용률</span>
            <span className="metric-value" style={{ color: getStatusColor(data.cpu) }}>
              {data.cpu}%
            </span>
          </div>
          <div className="metric-bar">
            <div
              className="metric-fill"
              style={{
                width: `${data.cpu}%`,
                backgroundColor: getStatusColor(data.cpu),
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">메모리 사용률</span>
            <span className="metric-value" style={{ color: getStatusColor(data.memory) }}>
              {data.memory}%
            </span>
          </div>
          <div className="metric-bar">
            <div
              className="metric-fill"
              style={{
                width: `${data.memory}%`,
                backgroundColor: getStatusColor(data.memory),
              }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">초당 요청</span>
            <span className="metric-value">{data.requests.toLocaleString()}</span>
          </div>
          <div className="metric-number">{data.requests}</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">활성 사용자</span>
            <span className="metric-value">{data.activeUsers.toLocaleString()}</span>
          </div>
          <div className="metric-number">{data.activeUsers}</div>
        </div>
      </div>

      <div className="logs-container">
        <div className="logs-header">
          <h3>실시간 로그</h3>
          <div className="logs-controls">
            <label className="checkbox-label">
              <input type="checkbox" checked={autoScroll} onChange={(e) => setAutoScroll(e.target.checked)} />
              자동 스크롤
            </label>
            <button className="btn-clear" onClick={clearLogs}>
              🗑️ 로그 지우기
            </button>
          </div>
        </div>

        <div className="logs-body">
          {logs.map((log) => (
            <div key={log.id} className={`log-entry log-${log.type}`}>
              <span className="log-timestamp">[{log.timestamp}]</span>
              <span className={`log-type type-${log.type}`}>{log.type.toUpperCase()}</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && <div className="logs-empty">로그가 없습니다</div>}
        </div>
      </div>

      <div className="realtime-note">
        <h3>📌 향후 개선 사항</h3>
        <ul>
          <li>WebSocket 연결 (Socket.io 또는 native WebSocket)</li>
          <li>Server-Sent Events (SSE) 활용</li>
          <li>실시간 차트 (시계열 데이터 시각화)</li>
          <li>로그 필터링 및 검색</li>
          <li>알림 시스템 (임계값 초과 시)</li>
          <li>데이터 내보내기</li>
        </ul>
      </div>
    </div>
  )
}
