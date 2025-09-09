import { useState, useEffect } from 'react'

export function useLoadingState(delay: number = 200) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}