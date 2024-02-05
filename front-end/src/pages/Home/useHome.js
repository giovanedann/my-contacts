import {
  useCallback, useDeferredValue, useEffect, useMemo, useState,
} from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
  )), [deferredSearchTerm, contacts]);

  const loadContacts = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy, signal);
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setContacts([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'
    ));
  }, []);

  function handleChangeSearchTerm({ target }) {
    setSearchTerm(target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      setContacts((prevState) => prevState.filter(({ id }) => (
        id !== contactBeingDeleted.id
      )));
      setIsDeleteModalVisible(false);
      toast({
        type: 'success',
        text: 'Contact deleted successfully!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Error on deleting contact',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  return {
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
  };
}
