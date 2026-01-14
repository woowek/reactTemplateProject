# 📁 프로젝트 구조 가이드

## 디렉토리 구조

```
src/
├── assets/              # 정적 리소스 (이미지, 폰트 등)
│   └── react.svg
│
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Button, Input 등)
│   ├── layout/         # 레이아웃 관련 컴포넌트 (Header, Footer, Sidebar)
│   └── ui/             # UI 컴포넌트 (Modal, Card, Table 등)
│
├── pages/              # 페이지 컴포넌트 (라우팅 단위)
│   ├── Home/
│   ├── About/
│   └── ...
│
├── layouts/            # 페이지 레이아웃 템플릿
│   ├── MainLayout.tsx
│   ├── AuthLayout.tsx
│   └── ...
│
├── hooks/              # 커스텀 훅
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── ...
│
├── services/           # API 호출 및 외부 서비스
│   ├── api/
│   │   ├── axios.config.ts
│   │   ├── auth.api.ts
│   │   └── user.api.ts
│   └── ...
│
├── utils/              # 유틸리티 함수
│   ├── format.ts
│   ├── validation.ts
│   └── ...
│
├── types/              # TypeScript 타입 정의
│   ├── api.types.ts
│   ├── common.types.ts
│   └── ...
│
├── contexts/           # React Context API
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── ...
│
├── constants/          # 상수 정의
│   ├── routes.ts
│   ├── api.constants.ts
│   └── ...
│
├── styles/             # 전역 스타일 및 테마
│   ├── globals.css
│   ├── variables.css
│   └── theme.ts
│
├── App.tsx            # 앱 루트 컴포넌트
├── main.tsx           # 앱 진입점
└── vite-env.d.ts      # Vite 타입 정의
```

## 📋 각 폴더의 역할

### `/components`
재사용 가능한 UI 컴포넌트들을 저장합니다.

- **`/common`**: 프로젝트 전반에서 사용되는 기본 컴포넌트
  - 예: Button, Input, Checkbox, Loading
  
- **`/layout`**: 레이아웃 구성 요소
  - 예: Header, Footer, Sidebar, Navigation
  
- **`/ui`**: 복잡한 UI 컴포넌트
  - 예: Modal, Dropdown, Table, Card

### `/pages`
각 라우트에 대응하는 페이지 컴포넌트들을 저장합니다.
페이지 단위로 폴더를 구성하여 관련 컴포넌트를 함께 관리할 수 있습니다.

```
pages/
└── Home/
    ├── index.tsx        # 메인 페이지 컴포넌트
    ├── Home.module.css  # 페이지 전용 스타일
    └── components/      # 해당 페이지에서만 사용하는 컴포넌트
```

### `/layouts`
페이지 레이아웃 템플릿을 정의합니다.
여러 페이지에서 공통으로 사용되는 레이아웃 구조를 정의합니다.

### `/hooks`
커스텀 React 훅을 저장합니다.
재사용 가능한 로직을 훅으로 분리합니다.

```typescript
// 예시
export const useAuth = () => { ... }
export const useFetch = <T>() => { ... }
export const useLocalStorage = (key: string) => { ... }
```

### `/services`
API 호출, 외부 서비스 연동 로직을 관리합니다.

```
services/
├── api/
│   ├── axios.config.ts   # Axios 설정
│   ├── auth.api.ts       # 인증 관련 API
│   └── user.api.ts       # 사용자 관련 API
└── storage/
    └── localStorage.ts   # 로컬 스토리지 관리
```

### `/utils`
공통으로 사용되는 유틸리티 함수들을 저장합니다.

```typescript
// 예시
export const formatDate = (date: Date) => { ... }
export const validateEmail = (email: string) => { ... }
export const debounce = (fn: Function, delay: number) => { ... }
```

### `/types`
TypeScript 타입 정의 파일들을 관리합니다.

```typescript
// api.types.ts
export interface ApiResponse<T> {
  data: T
  message: string
  status: number
}

// user.types.ts
export interface User {
  id: string
  name: string
  email: string
}
```

### `/contexts`
React Context를 이용한 전역 상태 관리 파일들을 저장합니다.

```typescript
// AuthContext.tsx
export const AuthContext = createContext<AuthContextType | null>(null)
export const AuthProvider = ({ children }) => { ... }
export const useAuthContext = () => { ... }
```

### `/constants`
애플리케이션 전반에서 사용되는 상수들을 정의합니다.

```typescript
// routes.ts
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
} as const

// api.constants.ts
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
} as const
```

### `/styles`
전역 스타일, CSS 변수, 테마 설정 등을 관리합니다.

## 🎯 네이밍 컨벤션

### 파일명
- **컴포넌트**: PascalCase (예: `Button.tsx`, `UserCard.tsx`)
- **훅**: camelCase with 'use' prefix (예: `useAuth.ts`, `useFetch.ts`)
- **유틸리티**: camelCase (예: `format.ts`, `validation.ts`)
- **타입**: camelCase with '.types' (예: `user.types.ts`, `api.types.ts`)

### 컴포넌트 구조
```typescript
// Good: 명확한 컴포넌트 구조
export const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>
}

// types 정의는 같은 파일에
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}
```

## 📝 임포트 순서

```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 2. Internal modules (절대 경로)
import { Button } from '@components/common/Button'
import { useAuth } from '@hooks/useAuth'
import { formatDate } from '@utils/format'
import type { User } from '@types/user.types'

// 3. Relative imports
import { UserCard } from './components/UserCard'
import styles from './Home.module.css'
```

## 🚀 다음 단계

1. **라우팅 설정**: React Router 설치 및 설정
2. **상태 관리**: Zustand, Redux Toolkit 등 선택
3. **UI 라이브러리**: Tailwind CSS, Material-UI 등 선택
4. **API 클라이언트**: Axios, React Query 설정
5. **테스팅**: Vitest, React Testing Library 설정

