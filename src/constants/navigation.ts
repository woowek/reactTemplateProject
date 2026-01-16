/**export interface NavItem {
  id: string
  icon: string
  text: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: '🏠', text: '대시보드', href: '/' },
  { id: 'code-editor', icon: '💻', text: '코드 에디터', href: '/code-editor' },
  { id: 'terminal', icon: '⌨️', text: '터미널', href: '/terminal' },
  { id: 'file-manager', icon: '📁', text: '파일 관리', href: '/file-manager' },
  { id: 'statistics', icon: '📊', text: '통계', href: '/statistics' },
  { id: 'realtime', icon: '⚡', text: '실시간 데이터', href: '/realtime' },
] as const 상수
 */

export interface NavItem {
  id: string
  icon: string
  text: string
  href: string
  active?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: '🏠', text: '대시보드', href: '/', active: true },
  { id: 'code-editor', icon: '�', text: '코드 에디터', href: '/code-editor' },
  { id: 'terminal', icon: '⌨️', text: '터미널', href: '/terminal' },
  { id: 'file-manager', icon: '�', text: '파일 관리', href: '/file-manager' },
  { id: 'statistics', icon: '📊', text: '통계', href: '/statistics' },
  { id: 'realtime', icon: '⚡', text: '실시간 데이터', href: '/realtime' },
] as const
