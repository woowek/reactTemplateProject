/**
 * WebSocket 기반 터미널 서버 (ES Module)
 * React 앱과 연동하여 실제 shell 명령어를 실행합니다.
 */

import { WebSocketServer } from 'ws'
import pty from 'node-pty'
import os from 'os'

const PORT = 8080

// WebSocket 서버 생성
const wss = new WebSocketServer({ port: PORT })

console.log(`🚀 터미널 서버 시작: ws://localhost:${PORT}`)
console.log(`📋 플랫폼: ${os.platform()}`)

wss.on('connection', (ws) => {
  console.log('✅ 새 터미널 연결')

  // 플랫폼에 맞는 shell 선택
  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'
  const args = os.platform() === 'win32' ? [] : []

  // PTY (가상 터미널) 생성
  const ptyProcess = pty.spawn(shell, args, {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME || process.env.USERPROFILE || process.cwd(),
    env: process.env,
  })

  console.log(`🖥️  Shell 프로세스 생성: ${shell} (PID: ${ptyProcess.pid})`)

  // Shell 출력 → WebSocket으로 전송
  ptyProcess.onData((data) => {
    try {
      ws.send(data)
    } catch (err) {
      console.error('❌ 전송 오류:', err.message)
    }
  })

  // WebSocket 메시지 처리
  ws.on('message', (msg) => {
    try {
      const message = msg.toString()
      
      // JSON 형식인지 확인 (리사이즈 명령어)
      try {
        const data = JSON.parse(message)
        if (data.type === 'resize') {
          ptyProcess.resize(data.cols, data.rows)
          console.log(`📐 터미널 크기 조정: ${data.cols}x${data.rows}`)
          return
        }
      } catch {
        // JSON 아니면 일반 입력으로 처리
      }
      
      // 일반 입력 → Shell로 전달
      ptyProcess.write(message)
    } catch (err) {
      console.error('❌ 입력 오류:', err.message)
    }
  })

  // 연결 종료
  ws.on('close', () => {
    console.log('🔌 터미널 연결 종료')
    try {
      ptyProcess.kill()
    } catch (err) {
      console.error('❌ 프로세스 종료 오류:', err.message)
    }
  })

  // 에러 처리
  ws.on('error', (err) => {
    console.error('❌ WebSocket 오류:', err.message)
  })

  ptyProcess.onExit((exitCode) => {
    console.log(`🛑 Shell 프로세스 종료 (코드: ${exitCode.exitCode})`)
    try {
      ws.close()
    } catch (err) {
      // 이미 닫힌 경우 무시
    }
  })
})

// 서버 에러 처리
wss.on('error', (err) => {
  console.error('❌ 서버 오류:', err.message)
})

// 서버 종료 시 정리
process.on('SIGINT', () => {
  console.log('\n🛑 서버 종료 중...')
  wss.close(() => {
    console.log('✅ 서버 종료 완료')
    process.exit(0)
  })
})