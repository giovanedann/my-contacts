const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) { // lists all the registers
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) { // get one register
    const { id } = request.params;
    const contactExists = await ContactsRepository.findById(id);

    return contactExists
      ? response.json(contactExists)
      : response.status(404).json({ error: 'contact not found' });
  }

  async store(request, response) { // create new register
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name field is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'email already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    return response.status(201).json(contact);
  }

  async update(request, response) { // edit a register
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name field is required' });
    }

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'contact not found' });
    }

    const contactFoundByMail = await ContactsRepository.findByEmail(email);

    if (contactFoundByMail && contactFoundByMail.id !== id) {
      return response.status(400).json({ error: 'email already in use' });
    }

    const contactUpdated = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    return response.json(contactUpdated);
  }

  async delete(request, response) { // delete a register
    const { id } = request.params;

    await ContactsRepository.delete(id);

    // SendStatus -> send a response without a body
    // status code 204 -> request succeeded but doesn't have a body (No Content)
    response.sendStatus(204);
  }
}

// Singleton pattern
module.exports = new ContactController();
