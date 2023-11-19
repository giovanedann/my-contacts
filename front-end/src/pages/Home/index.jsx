/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import {
  Container, Header, ContactsListHeader,
  Card, ErrorContainer,
  EmptyListContainer, NoContactFoundContainer,
} from './styles';

import formatPhone from '../../utils/formatPhone';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import thrash from '../../assets/images/icons/thrash.svg';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import { Loader, Modal } from '../../components';
import Button from '../../components/Button';
import { useHome } from './useHome';
import { InputSearch } from './components';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleToggleOrderBy,
    handleTryAgain,
    orderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch onChange={handleChangeSearchTerm} value={searchTerm} />
      )}

      <Header
        justifyContent={(
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        )}
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contact' : 'contacts'}
          </strong>
        )}
        {!isLoading && <Link to="/new">New Contact</Link>}
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad icon" />
          <div className="error-details">
            <strong className="error-message">
              An error has occurred while loading your contacts!
            </strong>
            <Button
              type="button"
              onClick={() => handleTryAgain()}
            >
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(!contacts.length && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="empty box icon" />
              <p>
                You do not have any registered contact yet!
                Click on <strong>New Contact</strong> above to register your first contact!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && !filteredContacts.length && !isLoading) && (
            <NoContactFoundContainer>
              <img src={magnifierQuestion} alt="contact not found icon" />
              <span>Contact <strong>{searchTerm}</strong> not found.</span>
            </NoContactFoundContainer>
          )}

          {Boolean(filteredContacts.length) && (
            <ContactsListHeader orderBy={orderBy}>
              <button type="button" className="sort-button" onClick={handleToggleOrderBy}>
                <span>Name</span>
                <img src={arrow} alt="Sort arrow" />
              </button>
            </ContactsListHeader>
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
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={thrash} alt="Delete button" />
                </button>
              </div>
            </Card>
          ))}

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Are you sure you want to delete the contact ${contactBeingDeleted?.name}?`}
            confirmLabel="Delete"
            onCancel={() => handleCloseDeleteModal()}
            onConfirm={() => handleConfirmDeleteContact(contactBeingDeleted)}
          >
            <p>This action cannot be undone!</p>
          </Modal>
        </>
      )}
    </Container>
  );
}
