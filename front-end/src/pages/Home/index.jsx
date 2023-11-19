/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';
import { Loader, Modal } from '../../components';
import { useHome } from './useHome';
import {
  ErrorStatus, Header, InputSearch, SearchNotFound, EmptyList, ContactsList,
} from './components';

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
            <SearchNotFound name={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            orderBy={orderBy}
            onDeleteContact={handleDeleteContact}
          />

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
