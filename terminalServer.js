/**
 * WebSocket 기반 터미널 서버 (ES Module)
 * React 앱과 연동하여 실제 shell 명령어를 실행합니다.
 */

import { WebSocketServer } from 'ws'
import pty from 'node-pty'
import { spawn } from 'child_process'
import os from 'os'

const PORT = 8080

// WebSocket 서버 생성
const wss = new WebSocketServer({ port: PORT })

console.log(`🚀 터미널 서버 시작: ws://localhost:${PORT}`)
console.log(`📋 플랫폼: ${os.platform()}`)
console.log(`🐳 Docker 컨테이너 지원: 활성화`)

wss.on('connection', (ws) => {
  console.log('✅ 새 터미널 연결')
  
  let ptyProcess = null
  let mode = 'local'
  let isInitialized = false

  // 초기 메시지 대기 (로컬 or 컨테이너)
  ws.once('message', (msg) => {
    try {
      const config = JSON.parse(msg.toString())
      
      if (config.type === 'init') {
        isInitialized = true
        mode = config.mode || 'local'
        const containerName = config.containerName || ''
        
        if (mode === 'container' && containerName) {
          // Docker 컨테이너 모드
          console.log(`🐳 컨테이너 터미널 생성: ${containerName}`)
          
          ptyProcess = spawn('docker', ['exec', '-it', containerName, '/bin/bash'], {
            stdio: ['pipe', 'pipe', 'pipe'],
          })
          
          // 컨테이너 출력 → WebSocket
          ptyProcess.stdout.on('data', (data) => {
            try {
              ws.send(data)
            } catch (err) {
              console.error('❌ 전송 오류:', err.message)
            }
          })
          
          ptyProcess.stderr.on('data', (data) => {
            try {
              ws.send(data)
            } catch (err) {
              console.error('❌ 전송 오류:', err.message)
            }
          })
          
          ptyProcess.on('error', (err) => {
            console.error('❌ Docker 실행 오류:', err.message)
            ws.send(`\x1b[31m오류: ${err.message}\x1b[0m\r\n`)
          })
          
        } else {
          // 로컬 터미널 모드
          console.log('🖥️  로컬 터미널 생성')
          
          const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash'
          const args = os.platform() === 'win32' ? [] : []
          
          ptyProcess = pty.spawn(shell, args, {
            name: 'xterm-256color',
            cols: config.cols || 80,
            rows: config.rows || 24,
            cwd: process.env.HOME || process.env.USERPROFILE || process.cwd(),
            env: {
              ...process.env,
              LANG: 'ko_KR.UTF-8',
              LC_ALL: 'ko_KR.UTF-8',
              TERM: 'xterm-256color',
            },
            encoding: 'utf8',
          })
          
          console.log(`🖥️  Shell 프로세스 생성: ${shell} (PID: ${ptyProcess.pid})`)
          
          // Shell 출력 → WebSocket
          ptyProcess.onData((data) => {
            try {
              ws.send(data)
            } catch (err) {
              console.error('❌ 전송 오류:', err.message)
            }
          })
          
          ptyProcess.onExit((exitCode) => {
            console.log(`🛑 Shell 프로세스 종료 (코드: ${exitCode.exitCode})`)
            try {
              ws.close()
            } catch (err) {
              // 이미 닫힌 경우 무시
            }
          })
        }
        
        // 초기화 완료 (메시지 전송하지 않음 - shell 출력과 섞이는 것 방지)
        console.log(`✅ ${mode === 'container' ? '컨테이너' : '로컬'} 터미널 준비 완료`)
      }
    } catch (err) {
      console.error('❌ 초기화 오류:', err.message)
    }
  })

  // WebSocket 메시지 처리
  ws.on('message', (msg) => {
    if (!ptyProcess || !isInitialized) return
    
    try {
      const message = msg.toString()
      
      // JSON 형식인지 확인 (리사이즈 명령어)
      try {
        const data = JSON.parse(message)
        if (data.type === 'resize' && ptyProcess.resize) {
          ptyProcess.resize(data.cols, data.rows)
          console.log(`📐 터미널 크기 조정: ${data.cols}x${data.rows}`)
          return
        }
        // init 메시지는 무시 (이미 once로 처리됨)
        if (data.type === 'init') {
          return
        }
      } catch {
        // JSON 아니면 일반 입력으로 처리
      }
      
      // 일반 입력 → Shell로 전달
      if (mode === 'container') {
        ptyProcess.stdin.write(message)
      } else {
        ptyProcess.write(message)
      }
    } catch (err) {
      console.error('❌ 입력 오류:', err.message)
    }
  })

  // 연결 종료
  ws.on('close', () => {
    console.log('🔌 터미널 연결 종료')
    try {
      if (ptyProcess) {
        if (mode === 'container') {
          ptyProcess.kill()
        } else {
          ptyProcess.kill()
        }
      }
    } catch (err) {
      console.error('❌ 프로세스 종료 오류:', err.message)
    }
  })

  // 에러 처리
  ws.on('error', (err) => {
    console.error('❌ WebSocket 오류:', err.message)
  })
})

// 서버 에러 처리
wss.on('error', (err) => {
  console.error('❌ 서버 오류:', err.message)
})

// 서버 종료 처리 함수
const shutdown = (signal) => {
  console.log(`\n🛑 서버 종료 중... (${signal})`)
  wss.close(() => {
    console.log('✅ 서버 종료 완료')
    process.exit(0)
  })
  
  // 강제 종료 타임아웃 (5초 후)
  setTimeout(() => {
    console.log('⚠️  강제 종료')
    process.exit(1)
  }, 5000)
}

// 여러 종료 신호 처리 (Windows 호환성)
process.on('SIGINT', () => shutdown('SIGINT'))   // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM')) // kill 명령
process.on('SIGBREAK', () => shutdown('SIGBREAK')) // Windows Ctrl+Break

// Windows에서 콘솔 종료 이벤트 처리
if (process.platform === 'win32') {
  const readline = await import('readline')
  readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', () => shutdown('SIGINT'))
}