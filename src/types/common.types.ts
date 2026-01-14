/**
 * 공통 타입 정의
 */

// API 응답 기본 타입
export interface ApiResponse<T = any> {
  data: T
  message: string
  status: number
  success: boolean
}

// 페이지네이션 타입
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// 페이지네이션이 포함된 응답 타입
export interface PaginatedResponse<T> {
  data: T[]
  pagination: Pagination
}

// 에러 응답 타입
export interface ApiError {
  message: string
  code: string
  status: number
  errors?: Record<string, string[]>
}

// 옵션 타입 (Select, Dropdown 등에서 사용)
export interface Option<T = string> {
  label: string
  value: T
}

// 로딩 상태 타입
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// 정렬 타입
export type SortOrder = 'asc' | 'desc'

export interface Sort {
  field: string
  order: SortOrder
}
