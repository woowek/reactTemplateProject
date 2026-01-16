/**
 * 컴포넌트 생명주기 관련 커스텀 훅
 */

import { useEffect, useRef } from 'react'

/**
 * 이전 값을 기억하는 훅
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

/**
 * 컴포넌트 마운트 상태를 추적하는 훅
 */
export const useIsMounted = (): (() => boolean) => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return () => isMounted.current
}

/**
 * useEffect와 유사하지만 초기 렌더링에서는 실행되지 않음
 */
export const useUpdateEffect = (effect: () => void | (() => void), deps: any[]) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    return effect()
  }, deps)
}
