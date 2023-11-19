import PropTypes from 'prop-types';

import { Container } from './styles';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export default function SearchNotFound({ name }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="contact not found icon" />
      <span>
        Contact
        {' '}
        <strong>{name}</strong>
        {' '}
        not found.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  name: PropTypes.string.isRequired,
};
