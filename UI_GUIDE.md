# UI 레이아웃 가이드

## 📐 레이아웃 구조

이 프로젝트는 **Header + Sidebar + Content + Footer** 구조로 되어 있습니다.

```
┌─────────────────────────────────────┐
│           Header (고정)              │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │     Main Content         │
│  (메뉴)   │       (페이지)            │
│          │                          │
│          │                          │
├──────────┴──────────────────────────┤
│            Footer                   │
└─────────────────────────────────────┘
```

## 🎨 컴포넌트 구성

### 1. MainLayout (src/layouts/MainLayout.tsx)
전체 레이아웃을 담당하는 컨테이너 컴포넌트

**기능:**
- ✅ 헤더 (앱 제목, 메뉴 토글 버튼, 알림/프로필 버튼)
- ✅ 사이드바 (네비게이션 메뉴)
- ✅ 메인 컨텐츠 영역
- ✅ 푸터 (저작권, 링크)
- ✅ 사이드바 토글 기능 (열기/닫기)
- ✅ 반응형 디자인 (모바일 지원)

**사용법:**
```tsx
import { MainLayout } from './layouts/MainLayout'

function App() {
  return (
    <MainLayout>
      <YourPage />
    </MainLayout>
  )
}
```

### 2. Home 페이지 (src/pages/Home.tsx)
대시보드 홈 페이지

**포함된 섹션:**
- 📊 통계 카드 (사용자, 상품, 주문, 매출)
- 📝 최근 활동 목록
- ⚡ 빠른 작업 버튼
- 📈 차트 영역 (placeholder)

## 🎯 주요 기능

### 사이드바 토글
- **데스크톱**: 사이드바 축소/확대
  - 열림: 250px 너비, 아이콘 + 텍스트
  - 닫힘: 70px 너비, 아이콘만 표시
  
- **모바일**: 사이드바 슬라이드
  - 열림: 화면 왼쪽에서 슬라이드 인
  - 닫힘: 화면 밖으로 숨김

### 반응형 디자인
```css
/* 데스크톱 (기본) */
- 헤더: 고정 상단
- 사이드바: 왼쪽 고정
- 컨텐츠: 가변 너비

/* 태블릿 (768px 이하) */
- 사이드바: 슬라이드 메뉴로 전환
- 컨텐츠: 전체 너비 사용

/* 모바일 (480px 이하) */
- 통계 카드: 1열 배치
- 빠른 작업: 1열 배치
```

## 🎨 스타일 커스터마이징

### CSS 변수 사용
모든 색상과 간격은 `src/styles/variables.css`에서 관리됩니다.

```css
/* 색상 변경 예시 */
:root {
  --color-primary: #3b82f6;  /* 메인 색상 */
  --color-primary-dark: #2563eb;
}

/* 간격 조정 */
:root {
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

### 레이아웃 커스터마이징

#### 사이드바 너비 변경
```css
/* MainLayout.css */
.main-sidebar {
  width: 250px;  /* 기본 너비 */
}

.main-sidebar.closed {
  width: 70px;  /* 닫힌 상태 너비 */
}
```

#### 헤더 높이 변경
```css
/* MainLayout.css */
.header-content {
  height: 64px;  /* 헤더 높이 */
}
```

## 📦 새 페이지 추가하기

### 1. 페이지 컴포넌트 생성
```tsx
// src/pages/Users.tsx
import './Users.css'

export const Users = () => {
  return (
    <div className="users-page">
      <div className="page-header">
        <h2 className="page-title">사용자 관리</h2>
        <p className="page-description">사용자 목록 및 관리</p>
      </div>
      
      <div className="content-card">
        {/* 페이지 내용 */}
      </div>
    </div>
  )
}
```

### 2. 페이지 라우팅 추가 (나중에)
React Router를 설치한 후:
```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
```

### 3. 사이드바 메뉴 업데이트
```tsx
// MainLayout.tsx
<li className="nav-item">
  <a href="/users" className="nav-link">
    <span className="nav-icon">👥</span>
    <span className="nav-text">사용자</span>
  </a>
</li>
```

## 🎯 재사용 가능한 컴포넌트

### 통계 카드 컴포넌트화 예시
```tsx
// src/components/ui/StatCard.tsx
interface StatCardProps {
  icon: string
  value: string | number
  label: string
  change?: number
  variant?: 'primary' | 'success' | 'warning' | 'info'
}

export const StatCard = ({ 
  icon, 
  value, 
  label, 
  change,
  variant = 'primary' 
}: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${variant}`}>{icon}</div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
      {change && (
        <div className={`stat-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change > 0 ? '+' : ''}{change}%
        </div>
      )}
    </div>
  )
}

// 사용
<StatCard 
  icon="👥" 
  value="1,234" 
  label="총 사용자" 
  change={12.5} 
  variant="primary"
/>
```

## 🔧 다음 단계

### 1. 라우팅 추가
```bash
npm install react-router-dom
```

### 2. 아이콘 라이브러리 추가
```bash
# React Icons (추천)
npm install react-icons

# 또는 Heroicons
npm install @heroicons/react
```

### 3. 차트 라이브러리 추가
```bash
# Recharts (추천)
npm install recharts

# 또는 Chart.js
npm install chart.js react-chartjs-2
```

### 4. UI 컴포넌트 라이브러리
```bash
# Headless UI (Tailwind와 궁합 좋음)
npm install @headlessui/react

# 또는 Radix UI
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

## 📱 모바일 대응 체크리스트

- ✅ 반응형 사이드바 (슬라이드 메뉴)
- ✅ 통계 카드 1열 배치
- ✅ 터치 친화적 버튼 크기
- ✅ 스크롤 최적화
- ⬜ 스와이프 제스처 (추가 예정)
- ⬜ PWA 지원 (추가 예정)

## 🎨 디자인 시스템

현재 적용된 디자인 토큰:

**색상:**
- Primary: #3b82f6 (파란색)
- Success: #10b981 (초록색)
- Warning: #f59e0b (주황색)
- Danger: #ef4444 (빨간색)

**간격:**
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

**둥근 모서리:**
- sm: 0.25rem
- md: 0.375rem
- lg: 0.5rem
- xl: 0.75rem

**그림자:**
- sm: 미세한 그림자
- md: 중간 그림자
- lg: 큰 그림자
- xl: 매우 큰 그림자

---

**현재 완료된 페이지:**
- ✅ Home (대시보드)

**추가 가능한 페이지:**
- ⬜ Users (사용자 관리)
- ⬜ Products (상품 관리)
- ⬜ Orders (주문 관리)
- ⬜ Analytics (분석)
- ⬜ Settings (설정)

UI 개선이나 새 페이지 추가가 필요하시면 말씀해주세요! 🚀
