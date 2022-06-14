import { PageHeader, ContactForm } from '../../components';

export default function NewContact() {
  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm buttonLabel="Save Contact" />
    </>
  );
}
