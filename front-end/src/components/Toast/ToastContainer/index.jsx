import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { useToastContainer } from './useToastContainer';

export default function ToastContainer() {
  const {
    messages,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onMessageRemove={(messageId) => handleRemoveItem(messageId)}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
