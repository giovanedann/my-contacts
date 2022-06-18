import { PageHeader, ContactForm } from '../../components';
import ContactsService from '../../services/ContactsService';

export default function NewContact() {
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
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <PageHeader title="New Contact" />
      <ContactForm
        buttonLabel="Save Contact"
        onSubmit={(formData) => handleSubmit(formData)}
      />
    </>
  );
}
