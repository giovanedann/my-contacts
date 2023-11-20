import PropTypes from 'prop-types';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import { useToastMessage } from './useToastMessage';
import { useAnimatedUnmount } from '../../../hooks/useAnimatedUnmount';

export default function ToastMessage({ message, onMessageRemove, isLeaving }) {
  const { handleRemoveToast } = useToastMessage({ message, onMessageRemove });
  const { ref, shouldRender } = useAnimatedUnmount({ trigger: !isLeaving });

  if (!shouldRender) return null;

  return (
    <Container
      type={message.type}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={ref}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  onMessageRemove: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
};
