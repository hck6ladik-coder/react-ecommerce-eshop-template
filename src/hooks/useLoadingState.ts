import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook pro správu loading stavu.
 * Users: Async data fetching, API calls, promise-based operations
 *
 * @param an initial loading state (default: true)
 * @param promise - Promise to track
 * @returns [isLoading, error, setLoading, reset]
 */
export const useLoadingState = (
  initialLoading = true,
  promise?: Promise<any>
) => {
  const [isLoading, setIsLoading] = useState(initialLoading)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!promise) return

    setIsLoading(true)

    promise
      .then((data) => {
        setIsLoading(false)
        return data
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }, [promise])

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading)
  }, [])

  const reset = useCallback(() => {
    setIsLoading(initialLoading)
    setError(null)
  }, [initialLoading])

  return [isLoading, error, setLoading, reset] as const
}

export default useLoadingState