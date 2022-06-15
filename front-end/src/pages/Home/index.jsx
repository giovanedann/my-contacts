import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
  Container, Header, ContactsListHeader, Card, SearchInputContainer,
} from './styles';

import formatPhone from '../../utils/formatPhone';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import thrash from '../../assets/images/icons/thrash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [searchTerm, contacts]);

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then((response) => response.json())
      .then((data) => setContacts([...data]))
      .catch((error) => console.log(error));
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'
    ));
  }

  function handleChangeSearchTerm({ target }) {
    setSearchTerm(target.value);
  }

  return (
    <Container>
      <SearchInputContainer>
        <input
          type="text"
          placeholder="Search contact by name..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </SearchInputContainer>

      <Header>
        <strong>
          { filteredContacts.length }
          {' '}
          { filteredContacts.length === 1 ? 'contact' : 'contacts' }
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>

      { Boolean(filteredContacts.length) && (
        <ContactsListHeader orderBy={orderBy}>
          <button type="button" className="sort-button" onClick={handleToggleOrderBy}>
            <span>Name</span>
            <img src={arrow} alt="Sort arrow" />
          </button>
        </ContactsListHeader>
      )}

      { filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{ contact.name }</strong>
              { contact.category_name && <small>{ contact.category_name }</small> }
            </div>
            <span>{ contact.email }</span>
            <span>{ formatPhone(contact.phone) }</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit button" />
            </Link>

            <button type="button">
              <img src={thrash} alt="Delete button" />
            </button>
          </div>
        </Card>
      ))}

    </Container>
  );
}
