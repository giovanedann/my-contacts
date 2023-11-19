import { PageHeader, ContactForm } from '../../components';
import { useNewContact } from './useNewContact';

export default function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();

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
