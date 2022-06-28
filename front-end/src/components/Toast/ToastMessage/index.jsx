import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onMessageRemove }) {
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

  return (
    <Container
      type={message.type}
      onClick={() => handleRemoveToast()}
      tabIndex={0}
      role="button"
    >
      { message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      { message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{ message.text }</strong>
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
};
