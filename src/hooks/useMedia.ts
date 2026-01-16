/**
 * 미디어 쿼리 관련 커스텀 훅
 */

import { useState, useEffect } from 'react'

/**
 * 미디어 쿼리 훅
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

/**
 * 모바일 기기 감지 (768px 이하)
 */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)')

/**
 * 태블릿 기기 감지 (769px ~ 1024px)
 */
export const useIsTablet = () => useMediaQuery('(min-width: 769px) and (max-width: 1024px)')

/**
 * 데스크톱 기기 감지 (1025px 이상)
 */
export const useIsDesktop = () => useMediaQuery('(min-width: 1025px)')

/**
 * 다크모드 감지
 */
export const usePrefersDarkMode = () => useMediaQuery('(prefers-color-scheme: dark)')
