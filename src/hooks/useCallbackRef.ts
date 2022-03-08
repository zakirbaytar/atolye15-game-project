import React, { useLayoutEffect, useRef } from 'react';

const useCallbackRef = (callback: Callback) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return callbackRef;
};

export default useCallbackRef;
