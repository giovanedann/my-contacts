import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { useToastContainer } from './useToastContainer';

export default function ToastContainer() {
  const {
    handleRemoveItem,
    renderList,
  } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onMessageRemove={(messageId) => handleRemoveItem(messageId)}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
