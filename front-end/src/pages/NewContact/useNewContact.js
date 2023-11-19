import { useRef } from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export function useNewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {
      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contact saved successfully!',
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'An error occurred while creating your contact!',
      });
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  };
}
