import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { useToastContainer } from './useToastContainer';

export default function ToastContainer() {
  const {
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onMessageRemove={(messageId) => handleRemoveItem(messageId)}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
