/**
 * 로컬 스토리지 유틸리티
 */

import { STORAGE_KEYS } from '../constants'

/**
 * 로컬 스토리지에 값 저장
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

/**
 * 로컬 스토리지에서 값 가져오기
 */
export const getItem = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return null
    }
    return JSON.parse(serializedValue) as T
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return null
  }
}

/**
 * 로컬 스토리지에서 값 제거
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error removing from localStorage:', error)
  }
}

/**
 * 로컬 스토리지 전체 삭제
 */
export const clear = (): void => {
  try {
    localStorage.clear()
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

// 특정 키에 대한 타입 안전한 헬퍼
export const storage = {
  // 토큰 관련
  setAccessToken: (token: string) => setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  getAccessToken: () => getItem<string>(STORAGE_KEYS.ACCESS_TOKEN),
  removeAccessToken: () => removeItem(STORAGE_KEYS.ACCESS_TOKEN),

  setRefreshToken: (token: string) => setItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  getRefreshToken: () => getItem<string>(STORAGE_KEYS.REFRESH_TOKEN),
  removeRefreshToken: () => removeItem(STORAGE_KEYS.REFRESH_TOKEN),

  // 사용자 정보
  setUser: <T>(user: T) => setItem(STORAGE_KEYS.USER, user),
  getUser: <T>() => getItem<T>(STORAGE_KEYS.USER),
  removeUser: () => removeItem(STORAGE_KEYS.USER),

  // 테마
  setTheme: (theme: string) => setItem(STORAGE_KEYS.THEME, theme),
  getTheme: () => getItem<string>(STORAGE_KEYS.THEME),

  // 언어
  setLanguage: (language: string) => setItem(STORAGE_KEYS.LANGUAGE, language),
  getLanguage: () => getItem<string>(STORAGE_KEYS.LANGUAGE),

  // 전체 삭제
  clearAll: clear,
}
