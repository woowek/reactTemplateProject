# React TypeScript Template Project

> Vite + React 19 + TypeScript 프로젝트 템플릿

## 🚀 프로젝트 개요

이 프로젝트는 React와 TypeScript를 사용한 현대적인 웹 애플리케이션 개발을 위한 템플릿입니다.
Vite를 번들러로 사용하여 빠른 개발 경험을 제공합니다.

## ✨ 주요 기능

- ⚡ **Vite** - 빠른 빌드 및 HMR
- ⚛️ **React 19** - 최신 React 버전
- 🔷 **TypeScript** - 타입 안정성
- 📁 **체계적인 폴더 구조** - 확장 가능한 아키텍처
- 🎨 **CSS Variables** - 테마 시스템
- 🔧 **유틸리티 함수** - 재사용 가능한 헬퍼
- 🪝 **커스텀 훅** - 로직 재사용
- 🎯 **경로 별칭** - 깔끔한 import 문

## 📋 기술 스택

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7
- **Linting**: ESLint 9
- **Compiler**: SWC

## 🛠️ 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 린팅

```bash
npm run lint
```

## 📁 프로젝트 구조

자세한 프로젝트 구조는 [STRUCTURE.md](./STRUCTURE.md)를 참고하세요.

```
src/
├── assets/          # 정적 리소스
├── components/      # 재사용 가능한 컴포넌트
│   ├── common/     # 공통 컴포넌트
│   ├── layout/     # 레이아웃 컴포넌트
│   └── ui/         # UI 컴포넌트
├── pages/          # 페이지 컴포넌트
├── layouts/        # 레이아웃 템플릿
├── hooks/          # 커스텀 훅
├── services/       # API 서비스
├── utils/          # 유틸리티 함수
├── types/          # TypeScript 타입
├── contexts/       # React Context
├── constants/      # 상수 정의
└── styles/         # 전역 스타일
```

## 🎯 경로 별칭

프로젝트에서 다음 경로 별칭을 사용할 수 있습니다:

```typescript
import { Button } from '@components/common/Button'
import { useDebounce } from '@hooks/useDebounce'
import { formatDate } from '@utils/format'
import type { User } from '@types/user.types'
```

사용 가능한 별칭:
- `@/*` - src 폴더
- `@components/*` - components 폴더
- `@hooks/*` - hooks 폴더
- `@utils/*` - utils 폴더
- `@services/*` - services 폴더
- `@types/*` - types 폴더
- `@assets/*` - assets 폴더
- `@styles/*` - styles 폴더
- `@pages/*` - pages 폴더
- `@layouts/*` - layouts 폴더

## 🔧 환경 변수

환경 변수는 `.env` 파일에서 관리됩니다.

```bash
# .env.example을 복사하여 .env 파일 생성
cp .env.example .env
```

사용 가능한 환경 변수:
- `VITE_APP_TITLE` - 애플리케이션 제목
- `VITE_API_BASE_URL` - API 베이스 URL
- `VITE_APP_ENV` - 환경 (development, production)

## 📦 내장된 유틸리티

### 커스텀 훅
- `useLocalStorage` - 로컬 스토리지 상태 관리
- `useDebounce` - 디바운스 값
- `useMediaQuery` - 반응형 미디어 쿼리
- `usePrevious` - 이전 값 추적
- `useIsMounted` - 마운트 상태 확인
- `useClickOutside` - 외부 클릭 감지

### 유틸리티 함수
- `format.ts` - 날짜/시간 포맷팅
- `validation.ts` - 유효성 검사
- `helpers.ts` - 공통 헬퍼 함수
- `storage.ts` - 로컬 스토리지 관리

### 컴포넌트
- `Button` - 스타일링된 버튼
- `Loading` - 로딩 스피너

## 🎨 스타일링

프로젝트는 CSS Variables를 사용한 테마 시스템을 제공합니다.

```css
/* src/styles/variables.css에서 정의된 변수 사용 */
.my-component {
  color: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

## 📝 개발 가이드

### 컴포넌트 생성

```typescript
// src/components/common/MyComponent.tsx
import { type ReactNode } from 'react'

interface MyComponentProps {
  children: ReactNode
}

export const MyComponent = ({ children }: MyComponentProps) => {
  return <div>{children}</div>
}
```

### 커스텀 훅 생성

```typescript
// src/hooks/useMyHook.ts
import { useState } from 'react'

export const useMyHook = () => {
  const [state, setState] = useState()
  
  // 로직...
  
  return { state, setState }
}
```

### API 서비스 생성

```typescript
// src/services/api/myApi.ts
import axios from 'axios'
import { ENV } from '../constants'

export const fetchData = async () => {
  const response = await axios.get(`${ENV.API_BASE_URL}/data`)
  return response.data
}
```

## 🚧 다음 단계

프로젝트를 확장하기 위한 추천 라이브러리:

### 라우팅
```bash
npm install react-router-dom
```

### 상태 관리
```bash
# Zustand (추천)
npm install zustand

# 또는 Redux Toolkit
npm install @reduxjs/toolkit react-redux
```

### UI 라이브러리
```bash
# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 또는 Material-UI
npm install @mui/material @emotion/react @emotion/styled
```

### 데이터 페칭
```bash
# TanStack Query (React Query)
npm install @tanstack/react-query
```

### 폼 관리
```bash
# React Hook Form
npm install react-hook-form

# Zod (유효성 검사)
npm install zod
```

### 테스팅
```bash
# Vitest + React Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## 📄 라이선스

MIT

---

**Happy Coding! 🎉**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
