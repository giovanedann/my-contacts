import { useEffect } from 'react';

export function useToastMessage({ message, onMessageRemove }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onMessageRemove(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onMessageRemove]);

  function handleRemoveToast() {
    onMessageRemove(message.id);
  }

  return { handleRemoveToast };
}
