import { Link } from 'react-router-dom';

import {
  Container, Header, ContactsListContainer, Card, SearchInputContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import thrash from '../../assets/images/icons/thrash.svg';

export default function Home() {
  return (
    <Container>
      <SearchInputContainer>
        <input
          type="text"
          placeholder="Search contact by name..."
        />
      </SearchInputContainer>

      <Header>
        <strong>3 contacts</strong>
        <Link to="/new">New Contact</Link>
      </Header>

      <ContactsListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Name</span>
            <img src={arrow} alt="Sort arrow" />
          </button>
        </header>
      </ContactsListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Contact Name</strong>
            <small>instagram</small>
          </div>
          <span>email@usermail.com</span>
          <span>(18) 12312-1234</span>
        </div>

        <div className="actions">
          <Link to="/edit/2">
            <img src={edit} alt="Edit button" />
          </Link>

          <button type="button">
            <img src={thrash} alt="Delete button" />
          </button>
        </div>
      </Card>
    </Container>
  );
}
