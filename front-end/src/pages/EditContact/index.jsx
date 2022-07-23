import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Loader, ContactForm, PageHeader } from '../../components';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

import useIsMounted from '../../hooks/useIsMounted';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const isMounted = useIsMounted();

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contactData);
          setIsLoading(false);
          setContactName(contactData.name);
        }
      } catch {
        if (isMounted()) {
          push('/');
          toast({
            type: 'danger',
            text: 'Contact not found.',
          });
        }
      }
    }

    loadContact();
  }, [id, push, isMounted]);

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

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Loading...' : `Edit ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save Changes"
        onSubmit={(formData) => handleSubmit(formData)}
      />
    </>
  );
}
