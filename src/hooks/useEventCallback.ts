import { useRef, useEffect, useCallback } from 'react';

type Callback = (...args: any[]) => void;

export function useEventCallback(fn: Callback, dependencies: any[]) {
  const ref = useRef<Callback>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback<Callback>(
    (args) => {
      const fn = ref.current;
      return fn(args);
    },
    [ref],
  );
}
