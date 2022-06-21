import { PageHeader, ContactForm } from '../../components';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

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

      toast({
        type: 'success',
        text: 'Contact saved successfully!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'An error occurred while creating your contact',
      });
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
