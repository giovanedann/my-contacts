import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Loader, ContactForm, PageHeader } from '../../components';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);
        contactFormRef.current.setFieldsValues(contactData);
        setIsLoading(false);
      } catch {
        push('/');
        toast({
          type: 'danger',
          text: 'Contact not found.',
          duration: 2000,
        });
      }
    }

    loadContact();
  }, [id, push]);

  function handleSubmit() {
    //
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Edit Contact" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save Changes"
        onSubmit={() => handleSubmit()}
      />
    </>
  );
}
