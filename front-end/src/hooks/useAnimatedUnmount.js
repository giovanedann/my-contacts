import { useEffect, useRef, useState } from 'react';

export function useAnimatedUnmount({ visible }) {
  const [shouldRender, setShouldRender] = useState(visible);
  const ref = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const refElement = ref.current;

    if (!visible && refElement) {
      refElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (refElement) {
        refElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return { shouldRender, ref };
}
