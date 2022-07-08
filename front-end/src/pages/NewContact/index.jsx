import { useRef } from 'react';
import { PageHeader, ContactForm } from '../../components';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const {
        name, email, phone, categoryId,
      } = formData;

      const contact = {
        name,
        email,
        phone,
        category_id: categoryId,
      };

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

  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save Contact"
        onSubmit={(formData) => handleSubmit(formData)}
      />
    </>
  );
}
