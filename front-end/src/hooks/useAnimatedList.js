import {
  createRef, useCallback, useState, useRef, useEffect,
} from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);

    removeListener();

    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);

    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prev) => prev.filter((id) => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const ref = animatedRefs.current.get(itemId);
      const element = ref?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (element && !alreadyHasListener) {
        const onAnimationEnd = () => handleAnimationEnd(itemId);
        const removeListener = () => element.removeEventListener('animationend', onAnimationEnd);

        animationEndListeners.current.set(itemId, removeListener);
        element.addEventListener('animationend', onAnimationEnd);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => {
        removeListener();
      });
    };
  }, []);

  const handleRemoveItem = useCallback((itemId) => {
    setPendingRemovalItemsIds((prev) => [...prev, itemId]);
  }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);
      return renderItem(
        item,
        { isLeaving, animatedRef },
      );
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    renderList,
    handleRemoveItem,
  };
}
