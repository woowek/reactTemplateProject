/**
 * 컴포넌트 마운트 상태를 추적하는 훅
 */

import { useEffect, useRef } from 'react'

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
