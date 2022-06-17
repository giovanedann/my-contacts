import PropTypes from 'prop-types';
import { Container } from './styles';
import Spinner from '../Spinner';

export default function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      <div className="form-field">
        { children }
        { isLoading && (
          <div className="spinner-container">
            <Spinner size={16} />
          </div>
        )}
      </div>
      { error && <small>{ error }</small> }
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
};
