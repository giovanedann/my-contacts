import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contactData);
          setIsLoading(false);
          setContactName(contactData.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;

        safeAsyncAction(() => {
          navigate('/');
          toast({
            type: 'danger',
            text: 'Contact not found.',
          });
        });
      }
    }

    loadContact();
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      await ContactsService.updateContact(id, contact)
        .then((updatedContactData) => setContactName(updatedContactData.name));

      toast({
        type: 'success',
        text: 'Contact updated successfully!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'An error occurred while editing your contact.',
      });
    }
  }

  return {
    isLoading,
    handleSubmit,
    contactFormRef,
    contactName,
  };
}
