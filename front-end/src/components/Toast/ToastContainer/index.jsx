import { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
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

  return (
    <Container>
      { messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onMessageRemove={(messageId) => handleRemoveMessage(messageId)}
        />
      ))}
    </Container>
  );
}
