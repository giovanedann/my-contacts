import PropTypes from 'prop-types';

import { Container } from './styles';

import sad from '../../../../assets/images/icons/sad.svg';
import { Button } from '../../../../components';

export default function ErrorStatus({ onTryAgainClick }) {
  return (
    <Container>
      <img src={sad} alt="Sad icon" />
      <div className="error-details">
        <strong className="error-message">
          An error has occurred while loading your contacts!
        </strong>
        <Button
          type="button"
          onClick={() => onTryAgainClick()}
        >
          Try again
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgainClick: PropTypes.func.isRequired,
};
