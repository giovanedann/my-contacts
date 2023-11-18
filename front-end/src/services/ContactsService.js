import HttpClient from './utils/HttpClient';
import ContactMapper from './mappers/ContactMapper';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContactById(id) {
    return this.HttpClient.get(`/contacts/${id}`);
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
