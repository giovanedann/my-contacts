import { useEffect, useRef, useCallback } from 'react';

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getIsMountedCurrent = useCallback(() => isMounted.current, []);

  return getIsMountedCurrent;
}
