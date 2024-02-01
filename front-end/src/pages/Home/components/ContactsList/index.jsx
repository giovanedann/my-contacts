import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { memo } from 'react';
import arrow from '../../../../assets/images/icons/arrow.svg';
import edit from '../../../../assets/images/icons/edit.svg';
import thrash from '../../../../assets/images/icons/thrash.svg';

import formatPhone from '../../../../utils/formatPhone';
import { Card, Header } from './styles';

function ContactsList({
  onToggleOrderBy,
  orderBy,
  onDeleteContact,
  filteredContacts,
}) {
  return (
    <>
      {Boolean(filteredContacts.length) && (
        <Header orderBy={orderBy}>
          <button type="button" className="sort-button" onClick={onToggleOrderBy}>
            <span>Name</span>
            <img src={arrow} alt="Sort arrow" />
          </button>
        </Header>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone && formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit button" />
            </Link>

            <button
              type="button"
              onClick={() => onDeleteContact(contact)}
            >
              <img src={thrash} alt="Delete button" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

export default memo(ContactsList);

ContactsList.propTypes = {
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,

  orderBy: PropTypes.string.isRequired,

  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
};
