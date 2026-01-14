# 환경 변수 가이드

## 📝 환경 변수 설정

이 프로젝트는 Vite의 환경 변수 시스템을 사용합니다.

## 🔧 설정 방법

### 1. 환경 변수 파일 생성

`.env.example` 파일을 복사하여 `.env` 파일을 생성합니다:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# macOS/Linux
cp .env.example .env
```

### 2. 환경 변수 수정

`.env` 파일을 열어 필요한 값을 수정합니다:

```bash
# 서버 설정
VITE_DEV_PORT=3000              # 개발 서버 포트
VITE_PREVIEW_PORT=3000          # 프리뷰 서버 포트
VITE_OPEN_BROWSER=true          # 브라우저 자동 열기 (true/false)

# 애플리케이션 설정
VITE_APP_TITLE=React Template Project
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_ENV=development
```

## 📋 환경 변수 목록

### 서버 설정
| 변수명 | 설명 | 기본값 | 예시 |
|--------|------|--------|------|
| `VITE_DEV_PORT` | 개발 서버 포트 | `3000` | `3000`, `5173`, `8080` |
| `VITE_PREVIEW_PORT` | 프리뷰 서버 포트 | `3000` | `3000`, `4173` |
| `VITE_OPEN_BROWSER` | 브라우저 자동 열기 | `true` | `true`, `false` |

### 애플리케이션 설정
| 변수명 | 설명 | 예시 |
|--------|------|------|
| `VITE_APP_TITLE` | 앱 제목 | `React Template Project` |
| `VITE_API_BASE_URL` | API 베이스 URL | `http://localhost:8000/api` |
| `VITE_APP_ENV` | 환경 | `development`, `production` |

## 🎯 사용 방법

### vite.config.ts에서 사용

```typescript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    server: {
      port: Number(env.VITE_DEV_PORT) || 3000,
      open: env.VITE_OPEN_BROWSER === 'true',
    }
  }
})
```

### React 컴포넌트에서 사용

```typescript
// 환경 변수는 import.meta.env로 접근
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appTitle = import.meta.env.VITE_APP_TITLE
const isDev = import.meta.env.DEV  // Vite 내장 변수

console.log('API URL:', apiUrl)
console.log('App Title:', appTitle)
console.log('Is Development:', isDev)
```

### constants 파일을 통한 사용 (권장)

```typescript
// src/constants/index.ts
export const ENV = {
  APP_TITLE: import.meta.env.VITE_APP_TITLE,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  APP_ENV: import.meta.env.VITE_APP_ENV,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const

// 사용
import { ENV } from '@/constants'

fetch(`${ENV.API_BASE_URL}/users`)
```

## 🌍 환경별 파일

프로젝트는 다음 환경 파일을 지원합니다:

```
.env                # 모든 환경에서 로드
.env.local          # 모든 환경에서 로드 (git 무시됨)
.env.development    # development 모드에서만 로드
.env.production     # production 모드에서만 로드
```

**우선순위 (높은 순서):**
1. `.env.[mode].local`
2. `.env.[mode]`
3. `.env.local`
4. `.env`

## ⚠️ 중요 사항

### 1. VITE_ 접두사 필수
클라이언트(브라우저)에서 접근할 환경 변수는 반드시 `VITE_` 접두사가 필요합니다.

```bash
# ✅ 올바름 - 브라우저에서 접근 가능
VITE_API_URL=http://localhost:3000

# ❌ 잘못됨 - 브라우저에서 접근 불가
API_URL=http://localhost:3000
```

### 2. 민감한 정보 주의
**절대 민감한 정보를 VITE_로 시작하는 변수에 넣지 마세요!**

```bash
# ❌ 위험! - 브라우저에 노출됨
VITE_SECRET_KEY=super-secret-key
VITE_DATABASE_PASSWORD=password123

# ✅ 안전 - 서버에서만 사용
SECRET_KEY=super-secret-key
DATABASE_PASSWORD=password123
```

### 3. Git에 커밋하지 않기
`.env` 파일은 `.gitignore`에 포함되어야 합니다:

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

**Git에 커밋해야 하는 파일:**
- ✅ `.env.example` - 템플릿 파일

**Git에 커밋하면 안 되는 파일:**
- ❌ `.env` - 실제 값이 들어있는 파일
- ❌ `.env.local`
- ❌ `.env.*.local`

## 🔄 환경 변수 변경 후

환경 변수를 변경한 후에는 **개발 서버를 재시작**해야 합니다:

```bash
# 개발 서버 중지 (Ctrl + C)
# 개발 서버 재시작
npm run dev
```

## 🐛 트러블슈팅

### 환경 변수가 undefined로 나옴
1. `VITE_` 접두사가 있는지 확인
2. 개발 서버를 재시작했는지 확인
3. 파일명이 `.env`인지 확인 (`.env.txt` 아님)

### TypeScript 타입 에러
`src/types/env.d.ts` 파일에 타입을 정의하세요:

```typescript
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 📚 참고 자료

- [Vite 환경 변수 공식 문서](https://vitejs.dev/guide/env-and-mode.html)
- [Vite 환경 변수 타입](https://vitejs.dev/guide/env-and-mode.html#intellisense)
