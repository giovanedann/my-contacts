import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.HttpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  getContactById(id) {
    return this.HttpClient.get(`/contacts/${id}`);
  }

  createContact(contactData) {
    return this.HttpClient.post('/contacts', { body: contactData });
  }

  updateContact(id, contactData) {
    return this.HttpClient.put(`/contacts/${id}`, { body: contactData });
  }
}

export default new ContactsService();
