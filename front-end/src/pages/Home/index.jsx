/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import {
  Container,
  ContactsListHeader,
  Card,
  NoContactFoundContainer,
} from './styles';

import formatPhone from '../../utils/formatPhone';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import thrash from '../../assets/images/icons/thrash.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import { Loader, Modal } from '../../components';
import { useHome } from './useHome';
import { ErrorStatus, Header, InputSearch } from './components';
import EmptyList from './components/EmptyList';

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
        contactsLength={contacts.length}
        filteredContactsLength={filteredContacts.length}
        hasError={hasError}
        isLoading={isLoading}
      />

      {hasError && (
        <ErrorStatus onTryAgainClick={handleTryAgain} />
      )}

      {!hasError && (
        <>
          {(!contacts.length && !isLoading) && (
            <EmptyList />
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
