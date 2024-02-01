/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';
import { Loader, Modal, Spinner } from '../../components';
import { useHome } from './useHome';
import {
  ErrorStatus, Header, InputSearch, SearchNotFound, EmptyList, ContactsList,
} from './components';

export default function Home() {
  const {
    isPending,
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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchNotFound = !hasError && (hasContacts && filteredContacts.length < 1 && !isLoading);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && <InputSearch onChange={handleChangeSearchTerm} value={searchTerm} />}

      <Header
        contactsLength={contacts.length}
        filteredContactsLength={filteredContacts.length}
        hasError={hasError}
        isLoading={isLoading}
      />

      {hasError && <ErrorStatus onTryAgainClick={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchNotFound && <SearchNotFound name={searchTerm} />}

      {hasContacts && (
        <>
          {isPending && <Spinner />}

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
