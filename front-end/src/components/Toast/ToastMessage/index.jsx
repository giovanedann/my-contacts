import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import { useToastMessage } from './useToastMessage';

export default function ToastMessage({
  message, onMessageRemove, isLeaving, onAnimationEnd,
}) {
  const { handleRemoveToast } = useToastMessage({ message, onMessageRemove });

  const toastMessageRef = useRef(null);

  useEffect(() => {
    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    const elementRef = toastMessageRef.current;

    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      elementRef.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [isLeaving, message.id, onAnimationEnd]);

  return (
    <Container
      ref={toastMessageRef}
      type={message.type}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
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
  onAnimationEnd: PropTypes.func.isRequired,
};
