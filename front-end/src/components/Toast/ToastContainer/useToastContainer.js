import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export function useToastContainer() {
  const [messages, setMessages] = useState([]);
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((messageId) => {
    setPendingRemovalMessagesIds((prev) => [...prev, messageId]);
  }, []);

  const handleAnimationEnd = useCallback((messageId) => {
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
    setPendingRemovalMessagesIds((prev) => prev.filter((id) => id !== messageId));
  }, []);

  return {
    messages,
    pendingRemovalMessagesIds,
    handleAnimationEnd,
    handleRemoveMessage,
  };
}
