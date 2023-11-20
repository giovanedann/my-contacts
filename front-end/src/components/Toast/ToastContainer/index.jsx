import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { useToastContainer } from './useToastContainer';

export default function ToastContainer() {
  const {
    messages, handleRemoveMessage, pendingRemovalMessagesIds, handleAnimationEnd,
  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onMessageRemove={(messageId) => handleRemoveMessage(messageId)}
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
