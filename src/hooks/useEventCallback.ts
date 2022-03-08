import { useRef, useEffect, useCallback } from 'react';

const useEventCallback = (callback: Callback, dependencies: unknown[]): Callback => {
  const ref = useRef<Callback>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = callback;
  }, [callback, ...dependencies]);

  return useCallback<Callback>(
    (args) => {
      const callbackFunction = ref.current;
      return callbackFunction(args);
    },
    [ref],
  );
};

export default useEventCallback;
