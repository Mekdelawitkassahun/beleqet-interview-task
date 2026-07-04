import { useState, useCallback } from 'react';

// Async state types
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Initial state factory
export const createInitialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null,
});

/**
 * A clean, reusable hook for managing async operations with proper state handling
 */
export function useAsync<T = unknown>() {
  const [state, setState] = useState<AsyncState<T>>(createInitialAsyncState<T>());

  // Reset state
  const reset = useCallback(() => {
    setState(createInitialAsyncState<T>());
  }, []);

  // Execute async function with proper state management
  const execute = useCallback(
    async (asyncFn: () => Promise<T>) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await asyncFn();
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    []
  );

  // Set data manually
  const setData = useCallback((data: T | null) => {
    setState((prev) => ({ ...prev, data, error: null }));
  }, []);

  // Set error manually
  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error, loading: false }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
  };
}

export default useAsync;
