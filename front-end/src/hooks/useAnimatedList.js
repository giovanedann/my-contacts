import { useCallback, useState } from 'react';

export function useAnimatedList(initialValue = []) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((itemId) => {
    setPendingRemovalItemsIds((prev) => [...prev, itemId]);
  }, []);

  const handleAnimationEnd = useCallback((itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prev) => prev.filter((id) => id !== itemId));
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => renderItem(
      item,
      { isLeaving: pendingRemovalItemsIds.includes(item.id) },
    ))
  ), [items, pendingRemovalItemsIds]);

  return {
    items,
    setItems,
    renderList,
    handleRemoveItem,
    handleAnimationEnd,
  };
}
