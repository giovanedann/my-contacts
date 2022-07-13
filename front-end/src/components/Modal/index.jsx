import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

export default function Modal({
  danger,
  title,
  children,
  isLoading,
  cancelLabel,
  visible,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!visible) {
    return null;
  }

  return createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{ title }</h1>
        <div className="modal-body">
          { children }
        </div>
        <Footer>
          <button
            type="button"
            className="cancel-button"
            onClick={() => onCancel()}
            disabled={isLoading}
          >
            { cancelLabel }
          </button>
          <Button
            type="button"
            danger={danger}
            onClick={() => onConfirm()}
            isLoading={isLoading}
          >
            { confirmLabel }
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
};
