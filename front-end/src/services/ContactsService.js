import HttpClient from './utils/HttpClient';
import ContactMapper from './mappers/ContactMapper';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const contact = await this.HttpClient.get(`/contacts/${id}`);
    return ContactMapper.toDomain(contact);
  }

  createContact(contactData) {
    const body = ContactMapper.toPersistence(contactData);
    return this.HttpClient.post('/contacts', { body });
  }

  updateContact(id, contactData) {
    const body = ContactMapper.toPersistence(contactData);
    return this.HttpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.HttpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
