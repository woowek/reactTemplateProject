import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 환경 변수 로드
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    
    // 개발 서버 설정
    server: {
      port: Number(env.VITE_DEV_PORT) || 3000,
      open: env.VITE_OPEN_BROWSER === 'true',
      host: true, // 네트워크 접근 허용
      proxy: {
        // WebSocket 터미널 프록시
        '/ws': {
          target: 'ws://localhost:8080',
          ws: true,
        },
      },
    },
    
    // 프리뷰 서버 설정
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 3000,
    },
    
    // 경로 별칭 설정
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@services': path.resolve(__dirname, './src/services'),
        '@types': path.resolve(__dirname, './src/types'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
      },
    },
    
    // 빌드 설정
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor'
              }
            }
          },
        },
      },
    },
  }
})
