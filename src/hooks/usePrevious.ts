/**
 * 이전 값을 기억하는 훅
 */

import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
