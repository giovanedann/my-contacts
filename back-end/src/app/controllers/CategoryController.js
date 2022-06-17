const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../helpers/isValidUUID');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoriesRepository.findAll(orderBy);

    response.send(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'invalid category ID' });
    }

    const categoryExists = await CategoriesRepository.findById(id);

    return categoryExists
      ? response.json(categoryExists)
      : response.status(404).json({ error: 'category not found' });
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name field is required' });
    }

    const categoryCreated = await CategoriesRepository.create(name);

    return response.status(201).json(categoryCreated);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'invalid category ID' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    const updatedCategory = await CategoriesRepository.update(id, { name });

    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'invalid category ID' });
    }

    await CategoriesRepository.delete(id);

    return response.sendStatus(204);
  }
}

// Singleton pattern
module.exports = new CategoryController();
