/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Container } from './styles';

export default function Header({
  hasError, contactsLength, filteredContactsLength, isLoading,
}) {
  const alignment = (
    hasError
      ? 'flex-end'
      : (
        contactsLength > 0
          ? 'space-between'
          : 'center'
      )
  );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && contactsLength > 0) && (
        <strong>
          {filteredContactsLength}
          {' '}
          {filteredContactsLength === 1 ? 'contact' : 'contacts'}
        </strong>
      )}

      {!isLoading && <Link to="/new">New Contact</Link>}
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  contactsLength: PropTypes.number.isRequired,
  filteredContactsLength: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
