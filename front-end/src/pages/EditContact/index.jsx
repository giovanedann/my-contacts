import { Loader, ContactForm, PageHeader } from '../../components';
import { useEditContact } from './useEditContact';

export default function EditContact() {
  const {
    contactFormRef, contactName, handleSubmit, isLoading,
  } = useEditContact();

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
