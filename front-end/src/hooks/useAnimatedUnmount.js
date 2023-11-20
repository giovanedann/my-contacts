import { useEffect, useRef, useState } from 'react';

export function useAnimatedUnmount({ trigger }) {
  const [shouldRender, setShouldRender] = useState(trigger);
  const ref = useRef(null);

  useEffect(() => {
    if (trigger) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const refElement = ref.current;

    if (!trigger && refElement) {
      refElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (refElement) {
        refElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [trigger]);

  return { shouldRender, ref };
}
