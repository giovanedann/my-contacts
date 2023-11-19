import { useCallback, useEffect, useState } from 'react';
import { toastEventManager } from '../../../utils/toast';

export function useToastContainer() {
  const [messages, setMessages] = useState([]);

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
    setMessages((prevState) => (
      prevState.filter((message) => message.id !== messageId)
    ));
  }, []);

  return {
    messages,
    handleRemoveMessage,
  };
}
